import React, { useEffect, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import storeItems from "../data/items.json";
import { Col, Row, Button } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import axios from "axios";
import { cartProduct } from "@webbshop-app/shared";

import Drawer from "@material-ui/core/Drawer";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
import { StoreItemProps } from "../components/StoreItem";
import { Cart } from "../Cart/Cart";

axios.defaults.baseURL = "http://localhost:4000";

export default function ProductsPage() {
  const [search, setSearch] = useState<string>("");
  const [enableButton, SetEnableButton] = useState<boolean>(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as StoreItemProps[]);
  //const navigate = useNavigate();

  //Cart
  const getTotalItems = (items: StoreItemProps[]) => {
    items.reduce((ack: number, item) => ack + item.amount, 0);
  };

  const setItem = async (itemID: number): Promise<void> => {
    const findItemId = storeItems.find((search) => search.id === itemID);
    const productName = findItemId?.name;
    const productPrice = findItemId?.price;
    const imgUrl = findItemId?.imgUrl;

    await axios.post<cartProduct>("/addToCartProducts", {
      productName,
      productPrice,
      imgUrl,
    });
    //navigate("/cart");
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      SetEnableButton(false);
    }
  }, []);

  return (
    <>
      <div className="body">
        <h1 className="webbshopTitle">TYPESCRIPT - WEBBSHOP</h1>
        <header>
          <h2 className="ProductsTitle">Products Page</h2>
        </header>
        <div className="search">
          <form className="form-inline">
            <input
              className="form-control mr-sm-2"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Products"
            />
          </form>
        </div>
        <hr />
        <div className="carrito">
          <button className="btn btn-primary" onClick={() => setCartOpen(true)}>
            <Badge badgeContent={getTotalItems(cartItems)} color="error">
              <AddShoppingCartIcon />
            </Badge>
            See your products
          </button>
        </div>
        <section className="section">
          <Drawer
            anchor="right"
            open={cartOpen}
            onClose={() => setCartOpen(false)}
          >
            <Cart
            // cartItems={cartItems}
            // addToCart={handleAddToCart}
            // removeFromCart={handleRemoveFromCart}
            />
          </Drawer>

          <Row md={2} xs={1} lg={3} className="g-3">
            {storeItems
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.name.toLowerCase().includes(search);
              })

              .map((item) => (
                <Col key={item.id}>
                  <Link to={`/details/${item.id}`}>
                    <StoreItem amount={0} {...item} />
                  </Link>
                  <Button
                    disabled={enableButton}
                    style={{ width: "100%" }}
                    onClick={(e) => setItem(item.id)}
                    className="btn btn-danger
                    "
                  >
                    add to cart
                  </Button>
                </Col>
              ))}
          </Row>
        </section>{" "}
        <hr />
      </div>
    </>
  );
}
