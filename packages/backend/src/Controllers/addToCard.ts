import express, { Router, Request, Response } from "express";
import { cartProduct } from "@webbshop-app/shared";
import { saveCartProduct } from "../Models/CartProductModel";
import { JwtReq } from "../services/userVerify";
const addToCardProduct = express.Router();

addToCardProduct.post("/", (req: JwtReq<cartProduct>, res: Response) => {
  if (req.jsonToken) {
    req.body.username = req.jsonToken.user;
    try {
      saveCartProduct(req.body);
    } catch {
      console.log("error saving product cart");
    }
  } else res.sendStatus(401);
});

export default addToCardProduct;
