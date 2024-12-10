import { user_interface } from "@webbshop-app/shared";
import { Request, Response, NextFunction } from "express";
import {
  checkUser,
  saveUser,
  uppdateUser,
  // loadUserInfo,
} from "../Models/userModel";
import { User } from "../Models/userModel";
// import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken";
import 'dotenv/config'
import { env } from 'process';

const JWT_SECRET = `${env.JWT_SECRET}`
const REFRESHTOKEN = `${env.REFRESHTOKEN}`

// console.log(JWT_SECRET, 'accessKey', REFRESHTOKEN, 'REFRESHTOKEN')

export type tokenPayload = {
  user: string;
  userId: string;
  UserAdress: string;
};

export interface JwtReq<T> extends Request<T> {
  jsonToken?: tokenPayload;
}

export const userVerify = async (
  items: user_interface
): Promise<string | object | undefined> => {
  if (items.username != "" && items.password != "") {
    try {
      const getUser = await checkUser(items);
      if (getUser && getUser._id) {
        console.log('getUser', getUser)
        const User_id = getUser._id.toString();

        const token = jwt.sign(
          {
            user: getUser.username,
            userId: User_id,
            UserAdress: getUser.address,
          },
          JWT_SECRET, // secret has to be a string, it could be an error otherwise
          {
            expiresIn: "1m" /*"1800s"*/,
          }
        );

        const refreshToken = jwt.sign(
          {
            user: getUser.username,
            userId: User_id,
            UserAdress: getUser.address,
          },
          REFRESHTOKEN, //secret has to be a string, it could be an error otherwise
          {
            expiresIn: "7d"
          }
        );
        console.log('token, refreshToken')
        return { token, refreshToken };
      }
    } catch (error) {
      console.log("wrong username or password")
      const wrongUser = 'wrong username or password'
      return { wrongUser };
    }
  } else {
    const wrongCredential = 'write both username and password'
    console.log("write both username and password")
    return { wrongCredential }
  }
}; // here we create a jwt token if the user login is sucessfull

export const refreshToken = async (req: Request, res: Response) => {
  // get the httpOnly cookie
  const cookie = req.cookies;
  // console.log('refresh Hit')
  if (!cookie?.RefreshJwt) { return res.status(401).json({ message: "Unauthorized" }); }

  const refreshToken = cookie.RefreshJwt;
  // console.log(refreshToken, ' refreshToken')
  try {
    const decoded = jwt.verify(
      refreshToken,
      `${env.REFRESHTOKEN}`,
    ) as tokenPayload;

    // console.log(decoded.user, ' decoded.user')

    const foundUser = await User.findOne({
      username: decoded.user,
    }).exec();

    // console.log(foundUser, 'foundUser refresh');
    if (!foundUser) {
      return res.status(401).json({ message: 'Unathorized user found' })
    };

    const FoundUser_Id = foundUser._id.toString();
    // console.log(FoundUser_Id, 'User_Id refresh')
    const AccessToken = jwt.sign(
      {
        user: foundUser.username,
        userId: FoundUser_Id,
        UserAdress: foundUser.address,
      },
      JWT_SECRET, // secret has to be a string, it could be an error otherwise
      {
        expiresIn: "1m",
      }
    ); // can also create a new refresh jwt if needed
    console.log("Access token refreshed");
    res.json({ AccessToken });

  } catch (error) {
    console.log("error token refreshed"); // you ll land here if token is incorrect or expired 
    return res.json({ message: 'Forbidden cookie/Jwt' })
    // when unconment .json({message}) you get the error: Error: Cannot set headers after they are sent to the client
  };
};

export const autenticateToken = async (
  req: JwtReq<any>,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.header("authorization")?.split(" ")[1]; // bearer token we split by space and get thetoken string
  console.log(token, ' token autenticateToken ')
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as tokenPayload;
      req.jsonToken = decoded; // decoded =  user: string; userId: string; UserAdress: string;
      // we personalize our request with the name jsonToken, req.jsonToken
    } catch {
      console.log('catch error in autenticateToken ')
      return res.sendStatus(403); // we get this status code when the token is incorrect or expired
      // when we get this error the middleware stops 
    }
  }
  next(); // this is a middleware, we pass the req if token is valid, to the route the client fetched;
  // if the requested endpoin has (req.jsonToken), it means that the route check if a jwt token extist 
  //in the header of the client request,
};

export const registerUser = async (
  userItem: user_interface,
  req: JwtReq<user_interface>
) => {
  const body = userItem;
  if (req.jsonToken) {
    const UserID = req.jsonToken.userId;
    userItem._id = UserID;
    try {
      return await uppdateUser(body);
    } catch {
      return "error updating";
    }
  } else if (
    body.username != "" &&
    body.password != "" &&
    body.mail != "" &&
    body.address != "" &&
    body.phoneNr != null
  ) {
    try {
      const userInfos = await saveUser(body);
      return userInfos;
    } catch {
      return "username or email already exist";
    }
  } else {
    return "fyll all fields";
  }
};
