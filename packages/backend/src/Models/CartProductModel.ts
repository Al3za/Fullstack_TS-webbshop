import mongoose, { model, Schema } from "mongoose";
import cache from "ts-cache-mongoose";
import { cartProduct } from "@webbshop-app/shared";

cache.init(mongoose, {
  engine: 'memory',
})

const productsCart = new Schema({
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  username: { type: String, required: true },
  adress: { type: String, required: true },
});

const productModel = model<cartProduct>("modelProduct", productsCart);

export const loadAllCartProd = async (
  nameUser: any
): Promise<cartProduct[]> => {
  console.log('load endpoint hit')
  // const loadAll = await productModel.find({ username: nameUser }).cache('10 seconds').exec(); cache works
  // it hold data for 10 secs then when this endpoint hits after 10 secs it ll shows new data if there is some
  const loadAll = await productModel.find({ username: nameUser }).exec()
  return loadAll;
};

export const saveCartProduct = async (cartItem: cartProduct) => {
  // cartItem.adress = '';
  const newProductCart = new productModel(cartItem);
  const saveCartProduct = await newProductCart.save();

  if (!saveCartProduct) {
    throw new Error("ingen product");
  }
};

interface deleteCartItem {
  username: string,
  ProdName: string
} //those names has to match the ones on axios request client side
export const DeleteCartItem = async (deleteCartItem: deleteCartItem) => {
  const getDataToDelete = await productModel.deleteMany({ username: deleteCartItem.username, productName: deleteCartItem.ProdName });
  if (!getDataToDelete) { throw new Error("Not able to delete") }

  // console.log(getDataToDelete, 'getDataToDelete') the console.log data when the delete function went well = { acknowledged: true, deletedCount: 2 } getDataToDelete
};


export const DeleteCartItems = async (NameUser: string): Promise<void> => {
  const deleteAllCartItems = await productModel.deleteMany({
    username: NameUser,
  });
};
