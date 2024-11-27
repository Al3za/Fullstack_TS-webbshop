import express, { Router, Request, Response } from "express";
import { cartProduct } from "@webbshop-app/shared";
import { DeleteCartItem, loadAllCartProd, saveCartProduct } from "../Models/CartProductModel";
import { JwtReq } from "../services/userVerify";
import { DeleteCartItems } from "../Models/CartProductModel";

const addToCardProduct = express.Router();

addToCardProduct.post("/", async (req: JwtReq<cartProduct>, res: Response) => {
  if (req.jsonToken) {
    req.body.username = req.jsonToken.user;
    req.body.adress = req.jsonToken.UserAdress;
    //req.body = null; // i get the error from the required model cardProductModel (required: true)
    // but the error is not catched in try & catch
    try {
      saveCartProduct(req.body);
      res.send("saved");
    } catch (error) {
      console.log('none');
    }
  } else res.sendStatus(401).send('Not Authorized') // cannot get the error string on client side
});

addToCardProduct.get(
  "/",
  async (req: JwtReq<cartProduct>, res: Response<cartProduct[]>) => {
    if (req.jsonToken) {
      res.send(await loadAllCartProd(req.jsonToken.user));
    }
  }
);

addToCardProduct.post(
  "/deleteProduct",
  async (req: JwtReq<string>, res: Response) => {
    if (req.jsonToken) {
      console.log(req.body, 'vvv');
      await DeleteCartItem(req.body);
      return res.sendStatus(200)
    };
  }
);

addToCardProduct.get(
  "/delete",
  async (req: JwtReq<void>, res: Response<string>) => {
    if (req.jsonToken) {
      await DeleteCartItems(req.jsonToken.user);
      res.send("deleted");
    }
  }
);

export default addToCardProduct;
