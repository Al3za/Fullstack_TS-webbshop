import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import storeItems from "../data/items.json";
import { Col, Row, Button } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import axios from "axios";
import { cartProduct } from "@webbshop-app/shared";

axios.defaults.baseURL = "http://localhost:4000";

export default function ProductsPage() {
  const [search, setSearch] = useState<string>("");
  const [enableButton, SetEnableButton] = useState<boolean>(true);
  const [cartButton, setCartButton] = useState<boolean>(true);

  const navigate = useNavigate();

  const setItem = async (itemID: number): Promise<void> => {
    const findItemId = storeItems.find((search) => search.id === itemID);
    const productName = findItemId?.name;
    const productPrice = findItemId?.price;

    const sendCartprods = await axios.post<cartProduct>("/addToCartProducts", {
      productName,
      productPrice,
    });
    const res = sendCartprods.data;
    if (typeof res === "string") {
      setCartButton(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      SetEnableButton(false);
    }
  }, []);

  return (
    <>
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
