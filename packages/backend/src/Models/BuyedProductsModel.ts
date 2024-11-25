import { model, Schema, connect } from "mongoose";
import { cartProduct } from "@webbshop-app/shared";

const Buyedproducts = new Schema({
  productName: { type: String },
  productPrice: { type: Number },
  username: { type: String/*, require:true*/ },
  adress: { type: String },
});

const BuyedProductModel = model<cartProduct>(
  "modelProductBuyed",
  Buyedproducts
);

export const loadAllBuyedProd = async (
  nameUser: any
): Promise<cartProduct[]> => {
  const loadAll = await BuyedProductModel.find({ username: nameUser }).exec();
  return loadAll;
};

export const saveBuyedProduct = async (cartItem: cartProduct) => {
  const newProductCart = new BuyedProductModel(cartItem);
  const saveCartProduct = await newProductCart.save();

  if (!saveCartProduct) {
    throw new Error("ingen product");
  }
};
