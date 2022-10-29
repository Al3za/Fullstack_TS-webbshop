import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import storeItems from "../data/items.json";
import { Col, Row, Button } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
// import { ProductSearch } from "../components/ProductSearch";

function setItem(item: number) {
  const findItemId = storeItems.find((search) => search.id === item);
  console.log(findItemId?.name);
  // return console.log(item, typeof item);
}

export default function ProductsPage() {
  const [search, setSearch] = useState<string>("");
  const [enableButton, SetEnableButton] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      SetEnableButton(false);
    }
  }, []);

  return (
    <>
      <h1>Products Page</h1>
      <header>headers här</header>
      <input
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Products"
      />
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
                <Link to={`/details/${item.id}`}>
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
