import express, { Request, Response, Router } from "express";
import { JwtReq } from "../services/userVerify";

const itemRouter = express.Router();

itemRouter.get("/", (req: JwtReq<any>, res: Response) => {
  if (req.jsonToken) {
    console.log("hej igen ", req.jsonToken.user);
  }
});

export default itemRouter;
