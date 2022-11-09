import { useState, useEffect } from "react";
import { cartProduct } from "@webbshop-app/shared";
import storeItems from "../data/items.json";
import axios, { HttpStatusCode } from "axios";
import { Wrapper } from "../Cart/CartItem.styles";
import Button from "@material-ui/core/Button";
import "../App.css";

axios.defaults.baseURL = "http://localhost:4000";

//if(Headers statusbar===403)

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
          imgUrl: some[i][0].imgUrl,
        });
      } else {
        arr.push({ productName: "", productPrice: 0, antal: 0, imgUrl: "" });
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

  const handleAddToCart = (clickedItem: cartProduct) => {
    setCartProduct((prev) => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((products) =>
          products.id === clickedItem.id
            ? { ...products, antal: products.antal + 1 }
            : products
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, antal: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartProduct((prev) =>
      prev.reduce((ack, products) => {
        if (products.id === id) {
          if (products.antal === 1) return ack;
          return [...ack, { ...products, antal: products.antal - 1 }];
        } else {
          return [...ack, products];
        }
      }, [] as cartProduct[])
    );
  };

  return (
    <div className="CartBoddy">
      <h1 className="CartTitle">ShoppingCart</h1>
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
              <Wrapper>
                <div>
                  <h3 className="title">{products.productName}</h3>
                  <div className="information">
                    <p>Price: ${products.productPrice} </p>
                    <p>
                      Total: $
                      {products.antal && products.antal * products.productPrice}
                    </p>
                  </div>
                  <div className="buttons">
                    <Button
                      size="small"
                      disableElevation
                      variant="contained"
                      onClick={() => handleRemoveFromCart(products.id)}
                    >
                      -
                    </Button>
                    <p>{products.antal}</p>
                    <Button
                      size="small"
                      disableElevation
                      variant="contained"
                      onClick={() => handleAddToCart(products)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <img src={products.imgUrl} alt={products.productName} />
              </Wrapper>
            </div>
          );
        }
      })}
      <div className="shipping">
        shipping price = 25 kr <p>total price = {sum} kr</p>
      </div>
    </div>
  );
}
