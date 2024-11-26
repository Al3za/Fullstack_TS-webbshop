import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cartProduct } from "@webbshop-app/shared";
import storeItems from "../data/items.json";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

export default function ShoppingCart() {
  const [cartProduct, setCartProduct] = useState<cartProduct[]>([]);
  const [buyProd, setBuyProd] = useState<cartProduct[]>([]);
  const [ableBtn, disableBtn] = useState<boolean>(true);

  const navigate = useNavigate();

  const GetCartProducts = async (): Promise<cartProduct[]> => {
    // this is the page rendered when we click on CART button when we added somethin to cart
    const getCartProd = await axios.get<cartProduct[]>("/addToCartProducts");
    setBuyProd(getCartProd.data);

    const MatchName = (getApiName: any) => {
      const test = getCartProd.data.filter((item: any) => {
        return item.productName === getApiName;
      });
      return test;
    };

    const ApiData = storeItems.map((itemName) => {
      return MatchName(itemName.name);
    });

    const arr = [];

    for (let i = 0; i < ApiData.length; i++) {
      if (ApiData[i].length > 0) {
        arr.push({
          productName: ApiData[i][0].productName,
          productPrice: ApiData[i][0].productPrice,
          antal: ApiData[i].length,
          adress: ApiData[i][0].adress,
        });
      }
    }

    return arr as unknown as cartProduct[];
  };

  useEffect(() => {
    GetCartProducts().then(setCartProduct);
  }, []);

  const send = async (item: any) => {
    const send = await axios.post("BuyedItem", item);
    const sentRes = send.data;
    if (sentRes === "saved") {
      await axios.get("/addToCartProducts/delete");
      disableBtn(false);
      await GetCartProducts();
    }
  };

  let nr = 0;
  let sum = 0;
  return (
    <div>
      <h1>ShoppingCart</h1>
      {cartProduct.map((products) => {
        // eslint-disable-next-line no-lone-blocks
        {
          sum += products.antal ? products.antal * products.productPrice : 0;
        }

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
      })}
      <p>total price = {sum} kr</p>
      <p>
        <button onClick={(e) => send(buyProd)}> BUY </button>
      </p>
      <p>
        <button disabled={ableBtn} onClick={(e) => navigate("/buyedProducts")}>
          Se All products you buyed
        </button>
      </p>
      <button onClick={(e) => navigate("/products")}> back to products </button>
    </div>
  );
}
