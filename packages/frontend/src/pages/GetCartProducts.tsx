//import { useState, useEffect } from "react";
import { cartProduct } from "@webbshop-app/shared";
import storeItems from "../data/items.json";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

const GetCartProducts = async (): Promise<cartProduct[]> => {
  const getCartProd = await axios.get("/addToCartProducts");

  const fik = (getJsonName: any) => {
    const test = getCartProd.data.filter((item: any) => {
      return item.productName === getJsonName;
    });
    console.log(test);
    return test;
  };

  const some = storeItems.map((itemName) => {
    return fik(itemName.name);
  });

  return zes(some);
};

const zes = (item: any) => {
  return item;
};

export default GetCartProducts;
