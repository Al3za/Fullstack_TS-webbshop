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

export const UserLogin = async (
  req: Request<user_interface>,
  res: Response<string | object>
) => {
  const reqBody = req.body;
  const getValidUser = await userVerify(reqBody);
  res.send(getValidUser);
};

export default User_Controller;
