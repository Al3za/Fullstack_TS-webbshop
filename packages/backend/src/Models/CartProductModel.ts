import { model, Schema } from "mongoose";
import { cartProduct } from "@webbshop-app/shared";

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
  const loadAll = await productModel.find({ username: nameUser }).exec();
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
