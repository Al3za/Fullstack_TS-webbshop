import express, { Router, Request, Response } from "express";
import { user_interface } from "@webbshop-app/shared";
import { JwtReq, registerUser, userVerify } from "../services/userVerify";

const User_Controller = express.Router();

User_Controller.post(
  "/",
  async (
    req: JwtReq<user_interface>,
    res: Response<user_interface | string>
  ) => {
    const UserRegister = await registerUser(req.body, req);
    res.send(UserRegister);
  }
);

interface tokens {
  token: string | object | undefined
  refreshToken: string | object | undefined
  wrongUser?: string
  wrongCredential?: string
}
export const UserLogin = async (
  req: Request<user_interface>, //the data we get from client, expected to be of user_interface type
  res: Response<string | object>
) => {
  // console.log(req.cookies, ' login cookies')
  const reqBody = req.body;
  // console.log(reqBody, 'reqBody')
  const getValidUser = await userVerify(reqBody) as tokens  // read below
  // as tokens because calling userVerify function we can get a string, an object or undefined as response
  if (getValidUser.wrongUser) {
    console.log('errore here')
    return res.status(401).json({ message: getValidUser.wrongUser })//.send(getValidUser.wrongUser)
  }
  if (getValidUser.wrongCredential) {
    // return res.status(400).json({ message: getValidUser.wrongCredential })
  };

  const getToken = getValidUser //as tokens
  // console.log('token ', getToken.token, 'refreshToken ', getToken.refreshToken)
  res.cookie('RefreshJwt', getToken.refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 1week (168 hours)
  })
  res.status(200).send(getToken.token)

  // res.status(400).json({ message: 'not found user' })

}; // here we call the userVerify to validate the user login

export default User_Controller;
