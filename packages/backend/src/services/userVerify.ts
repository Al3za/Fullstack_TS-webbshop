import { user_interface } from "@webbshop-app/shared";
import { Request, Response, NextFunction } from "express";
import {
  checkUser,
  saveUser,
  uppdateUser,
  // loadUserInfo,
} from "../Models/userModel";

import jwt from "jsonwebtoken";

const JWT_SECRET = "hgvdfhbsadfvasdfjvdf";

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
        const User_id = getUser._id.toString();
        const token = jwt.sign(
          {
            user: getUser.username,
            userId: User_id,
            UserAdress: getUser.address,
          },
          JWT_SECRET,
          {
            expiresIn: "1800s",
          }
        );
        return { token };
      }
    } catch {
      return "wrong username or password";
    }
  } else {
    return "write both username and password";
  }
};

export const autenticateToken = async (
  req: JwtReq<any>,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.header("authorization")?.split(" ")[1]; // bearer token we split by space and get thetoken string
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as tokenPayload;
      req.jsonToken = decoded;
    } catch {
      return res.sendStatus(403);
    }
  }
  next();
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
