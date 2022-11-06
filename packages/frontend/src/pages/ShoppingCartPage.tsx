import { useState, useEffect } from "react";
import { cartProduct } from "@webbshop-app/shared";
//import GetCartProducts from "./GetCartProducts";
import storeItems from "../data/items.json";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

export default function ShoppingCart() {
  const [cartProduct, setCartProduct] = useState<cartProduct[]>([]);

  const GetCartProducts = async (): Promise<cartProduct[]> => {
    const getCartProd = await axios.get<cartProduct[]>("/addToCartProducts");

    const fik = (getJsonName: any) => {
      const test = getCartProd.data.filter((item: any) => {
        return item.productName === getJsonName;
      });
      return test;
    };

    const some = storeItems.map((itemName) => {
      return fik(itemName.name);
    });

    const arr = [];

    for (let i = 0; i < some.length; i++) {
      if (some[i].length > 0) {
        arr.push({
          productName: some[i][0].productName,
          productPrice: some[i][0].productPrice,
          antal: some[i].length,
        });
      } else {
        arr.push({ productName: "", productPrice: 0, antal: 0 });
      }
    }

    return arr as unknown as cartProduct[];
  };

  useEffect(() => {
    GetCartProducts().then(setCartProduct);
  }, []);

  console.log(cartProduct);

  let nr = 0;
  let sum = 0;
  return (
    <div>
      <h1>ShoppingCart</h1>
      {cartProduct.map((products) => {
        // eslint-disable-next-line no-lone-blocks
        {
          sum += products.antal
            ? products.antal * products.productPrice + 25
            : 0;
        }
        if (products.productPrice > 0) {
          return (
            <div key={nr++}>
              <p>
                {products.productName} {""} {products.antal} {""}{" "}
                {products.productPrice}
                {""}
                {""} price per vara ={" "}
                {products.antal && products.antal * products.productPrice} kr
              </p>
            </div>
          );
        }
      })}
      shipping price = 25 kr <p>total price = {sum} kr</p>
    </div>
  );
}
