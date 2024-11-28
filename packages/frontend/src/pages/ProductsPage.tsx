import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import storeItems from "../data/items.json";
import { Col, Row, Button } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import axios from "axios";
import { cartProduct } from "@webbshop-app/shared";

axios.defaults.baseURL = "http://localhost:4000";

let notFounMsg = "";
export default function ProductsPage() {
  const [search, setSearch] = useState<string>("");
  const [enableButton, SetEnableButton] = useState<boolean>(true);
  const [cartButton, setCartButton] = useState<boolean>(true);

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state, "location.state");
  if (location.state && location.state.itemLength > 0) {
    console.log(location.state.itemLength, "location.state.itemLength");
  }
  const setItem = async (itemID: number): Promise<void> => {
    const findItemId = storeItems.find((search) => search.id === itemID);
    const productName = findItemId?.name;
    const productPrice = findItemId?.price;

    try {
      const sendCartprods = await axios.post<cartProduct | string>(
        "/addToCartProducts",
        {
          productName,
          productPrice,
        }
      );
      const res: cartProduct | string = sendCartprods.data;
      console.log(res, "res");

      setCartButton(false);
    } catch (error) {
      alert(error);
    }
  };

  const checkCartProduct = async () => {
    const getCartProd = await axios.get<cartProduct[]>("/addToCartProducts");
    return getCartProd.data;
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    console.log();
    if (location.state && location.state.itemLength > 0) {
      setCartButton(false);
    } else {
      console.log("hit database");
      const CartData = checkCartProduct();
      CartData.then((res) => {
        const data = res.length;
        if (data > 0) {
          // console.log("data lenght");
          setCartButton(false);
        } // in future try to cache data
      });
    } // this way i make less query to the db,
    if (token) {
      SetEnableButton(false);
    }
  }, []);

  return (
    <>
      {notFounMsg}
      <div className="Cart_Btn">
        <button disabled={cartButton} onClick={(e) => navigate("/cart")}>
          CART
        </button>
      </div>
      <div className="ProductsHeader">
        <h1>Products Page</h1>
        <input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Products"
        />
        <hr />
        <button onClick={(e) => navigate("/login")}>go to login</button>
      </div>
      <hr />
      <section>
        <Row md={2} xs={1} lg={3} className="g-3">
          {storeItems
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.name.toLowerCase().includes(search);
            })

            .map((item) => (
              <Col key={item.id}>
                <Link className="link" to={`/details/${item.id}`}>
                  <StoreItem {...item} />
                </Link>
                <Button
                  disabled={enableButton}
                  style={{ width: "100%" }}
                  onClick={(e) => setItem(item.id)}
                >
                  add to cart
                </Button>
              </Col>
            ))}
        </Row>
      </section>{" "}
      <hr />
    </>
  );
}
// if storedItems data was stored in the mongoDb, there could i use cache data.
