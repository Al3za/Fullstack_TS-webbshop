import { model, Schema, connect } from "mongoose";
import { cartProduct } from "@webbshop-app/shared";

const Buyedproducts = new Schema({
  productName: { type: String },
  productPrice: { type: Number },
  username: { type: String },
  adress: { type: String },
});

const BuyedProductModel = model<cartProduct>("modelProduct", Buyedproducts);

export const loadAllCartProd = async (
  nameUser: any
): Promise<cartProduct[]> => {
  const loadAll = await BuyedProductModel.find({ username: nameUser }).exec();
  return loadAll;
};

export const saveCartProduct = async (cartItem: cartProduct) => {
  const newProductCart = new BuyedProductModel(cartItem);
  const saveCartProduct = await newProductCart.save();

  if (!saveCartProduct) {
    throw new Error("ingen product");
  }
};
