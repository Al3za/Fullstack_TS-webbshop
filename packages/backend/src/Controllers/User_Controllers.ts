import express, { Router, Request, Response } from "express";
import { user_interface } from "@webbshop-app/shared";
import { JwtReq, registerUser, userVerify } from "../services/userVerify";

const User_Controller = express.Router();

User_Controller.post(
  "/",
  async (req: JwtReq<user_interface>, res: Response<string | boolean>) => {
    // const UserRegister = await registerUser(req.body, req);
    const UserRegister = await registerUser(req.body, req);
    console.log("hej");
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

User_Controller.get("/sale", async (req: JwtReq<any>, res: Response) => {
  console.log("sale");
  if (req.jsonToken) {
    console.log("ciao item ", req.jsonToken.user);
  }
  //res.send("item tokens");
});

export default User_Controller;
