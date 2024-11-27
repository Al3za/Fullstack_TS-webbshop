import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cartProduct } from "@webbshop-app/shared";
import storeItems from "../data/items.json";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

axios.defaults.baseURL = "http://localhost:4000";

export default function ShoppingCart() {
  const [cartProduct, setCartProduct] = useState<cartProduct[]>([]);
  const [buyProd, setBuyProd] = useState<cartProduct[]>([]);
  const [ableBtn, disableBtn] = useState<boolean>(true);

  const navigate = useNavigate();

  const GetCartProducts = async (): Promise<cartProduct[]> => {
    // this is the page rendered when we click on CART button when we added somethin to cart
    const getCartProd = await axios.get<cartProduct[]>("/addToCartProducts");
    // console.log(getCartProd.data, "dataaa", getCartProd.data[0].username);
    setBuyProd(getCartProd.data);

    const MatchName = (getApiName: any) => {
      const filters = getCartProd.data.filter((item: any) => {
        return item.productName === getApiName;
      });
      return filters;
    };

    const ApiData = storeItems.map((itemName) => {
      return MatchName(itemName.name);
    }); // if no product name matches the map method will anyway return an empty array;

    const arr = [];

    for (let i = 0; i < ApiData.length; i++) {
      if (ApiData[i].length > 0) {
        arr.push({
          username: ApiData[i][0].username,
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

  const deleteCardProd = async (
    ProdName: string,
    username?: string | null
  ): Promise<void> => {
    const deleteProduct = await axios.post("/addToCartProducts/deleteProduct", {
      ProdName,
      username,
    }); // those names has to match the ones on req.body endpoints
    if (deleteProduct.status === 200) {
      console.log("delete prod true");
      GetCartProducts().then(setCartProduct);
    }
  };

  let nr = 0;
  let sum = 0;
  return (
    <div className="ShopCartdiv">
      <h1>ShoppingCart</h1>
      {cartProduct.map((products) => {
        // eslint-disable-next-line no-lone-blocks
        {
          sum += products.antal ? products.antal * products.productPrice : 0;
        }

        return (
          <div key={nr++}>
            <p>
              PRODUCT: <span>{products.productName}</span> TOTAL:
              <span>{products.antal}</span> PRICE
              <span>{products.productPrice}</span>
              PRICE FOR EACH =
              <span>
                {products.antal && products.antal * products.productPrice} kr
              </span>
            </p>
            <button
              onClick={(e) =>
                deleteCardProd(products.productName, products.username)
              }
            >
              <FaTrash />
            </button>
          </div>
        );
      })}
      <p>
        {" "}
        TOTAL PRICE=<span> {sum} kr</span>
      </p>
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
