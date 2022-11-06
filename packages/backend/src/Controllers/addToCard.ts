import express, { Router, Request, Response } from "express";
import { cartProduct } from "@webbshop-app/shared";
import { loadAllCartProd, saveCartProduct } from "../Models/CartProductModel";
import { JwtReq } from "../services/userVerify";
const addToCardProduct = express.Router();

addToCardProduct.post("/", async (req: JwtReq<cartProduct>, res: Response) => {
  if (req.jsonToken) {
    req.body.username = req.jsonToken.user;
    try {
      saveCartProduct(req.body);
      //res.send(await loadAllCartProd());
    } catch {
      console.log("error saving product cart");
    }
  } else res.sendStatus(401);
});

addToCardProduct.get(
  "/",
  async (req: JwtReq<cartProduct>, res: Response<cartProduct[]>) => {
    if (req.jsonToken) {
      res.send(await loadAllCartProd(req.jsonToken.user));
    }
  }
);

export default addToCardProduct;
