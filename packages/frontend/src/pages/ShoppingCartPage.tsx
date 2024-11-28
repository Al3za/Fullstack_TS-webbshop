import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cartProduct } from "@webbshop-app/shared";
import storeItems from "../data/items.json";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

axios.defaults.baseURL = "http://localhost:4000";

let Current_NumberItem_InCart = 0;
export default function ShoppingCart() {
  const [cartProduct, setCartProduct] = useState<cartProduct[]>([]);
  const [buyProd, setBuyProd] = useState<cartProduct[]>([]);
  const [ableBtn, setAbleBtn] = useState<boolean>(true);

  const navigate = useNavigate();

  const GetCartProducts = async (): Promise<cartProduct[]> => {
    // this is the page rendered when we click on CART button when we added somethin to cart
    const getCartProd = await axios.get<cartProduct[]>("/addToCartProducts");
    Current_NumberItem_InCart = getCartProd.data.length;
    if (getCartProd.data.length > 0) {
      setAbleBtn(false);
    } else {
      setAbleBtn(true);
    }
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
  console.log("Current_NumberItem_InCart", Current_NumberItem_InCart);
  useEffect(() => {
    console.log("hit");
    GetCartProducts().then(setCartProduct);
  }, []);

  const Buy = async (item: any) => {
    const text = "you want to proceed with the purchase";
    // eslint-disable-next-line no-restricted-globals
    if (confirm(text) === true) {
      const send = await axios.post("BuyedItem", item);
      const sentRes = send.data;
      if (sentRes === "saved") {
        navigate("/buyedProducts");
        await axios.get("/addToCartProducts/delete");
      }
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

  interface CartItemLength {
    itemLength: Number;
  }

  const cartItem_length: CartItemLength = {
    itemLength: Current_NumberItem_InCart,
  };

  let nr = 0;
  let sum = 0;
  return (
    <div className="ShopCartdiv">
      <h1>Cart</h1>
      {cartProduct.map((products) => {
        // eslint-disable-next-line no-lone-blocks
        {
          sum += products.antal ? products.antal * products.productPrice : 0;
        }

        return (
          <div key={nr++}>
            <p>
              <u>PRODUCT</u>: <span>{products.productName}</span> <u>TOTAL</u>:{" "}
              <span>{products.antal}</span> <u>PRICE</u>:{" "}
              <span>{products.productPrice} Kr</span>
              {products.antal && products.antal > 1 ? (
                <>
                  <u>
                    <u>PRICE FOR</u> <span>{products.antal} =</span>
                  </u>
                  <span>
                    {products.antal && products.antal * products.productPrice}{" "}
                    kr
                  </span>
                </>
              ) : (
                ""
              )}
              <button
                onClick={(e) =>
                  deleteCardProd(products.productName, products.username)
                }
              >
                <FaTrash />
              </button>
            </p>
          </div>
        );
      })}
      <p>
        {" "}
        <u>TOTAL PRICE</u> =<span> {sum} kr</span>
      </p>
      <div className="DivBtn">
        <button disabled={ableBtn} onClick={(e) => Buy(buyProd)}>
          {" "}
          BUY{" "}
        </button>{" "}
        <button>
          <Link to={"/products"} state={cartItem_length}>
            Back To Products
          </Link>
        </button>
      </div>
    </div>
  );
}
