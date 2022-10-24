
import express, { Router, Request, Response } from "express";
import { user_interface } from '@webbshop-app/shared';
import { saveUser } from "../Models/userModel";
import { JwtReq, registerUser, userVerify } from "../services/userVerify";


const User_Controller = express.Router();

User_Controller.post(
  "/",
  async (req: Request<user_interface>, res: Response<string | boolean>) => {
    const UserRegister = await registerUser(req.body, req);
    res.send(UserRegister);
  }
  //}
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
  if (req.jsonToken) {
    console.log("ciao item ", req.jsonToken.user);
  }
  //res.send("item tokens");
});

export default User_Controller;
