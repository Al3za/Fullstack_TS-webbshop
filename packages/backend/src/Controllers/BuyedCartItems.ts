import express, { Router, Request, Response } from "express";
import { cartProduct } from "@webbshop-app/shared";
import { JwtReq } from "../services/userVerify";
import {
  loadAllBuyedProd,
  saveBuyedProduct,
} from "../Models/BuyedProductsModel";

const Buyed_Item = express.Router();

Buyed_Item.post("/", async (req: JwtReq<cartProduct>, res: Response) => {
  if (req.jsonToken) {
    const arrBody = req.body;
    try {
      await arrBody.forEach((item: any) => {
        saveBuyedProduct(item);
      }, res.send("saved"));
    } catch {
      console.log("error saving product cart");
    }
  } else res.sendStatus(401);
});

Buyed_Item.get(
  "/",
  async (req: JwtReq<cartProduct>, res: Response<cartProduct[]>) => {
    if (req.jsonToken) {
      res.send(await loadAllBuyedProd(req.jsonToken.user));
    }
  }
);

export default Buyed_Item;
