import { model, Schema, connect } from "mongoose";
import { cartProduct } from "@webbshop-app/shared";

const productsCart = new Schema({
  productName: { type: String },
  productPrice: { type: Number },
  username: { type: String },
  adress: { type: String },
});

const productModel = model<cartProduct>("modelProduct", productsCart);

export const loadAllCartProd = async (
  username: any
): Promise<cartProduct[]> => {
  const loadAll = await productModel.find({ username }).exec();
  return loadAll;
};

export const saveCartProduct = async (cartItem: cartProduct) => {
  const newProductCart = new productModel(cartItem);
  const saveCartProduct = await newProductCart.save();

  if (!saveCartProduct) {
    throw new Error("ingen product");
  }
};
