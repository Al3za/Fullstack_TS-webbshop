import React, { useState } from "react";
import { Link } from "react-router-dom";
import storeItems from "../data/items.json";
import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
// import { ProductSearch } from "../components/ProductSearch";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
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
              </Col>
            ))}
        </Row>
      </section>{" "}
      <hr />
    </>
  );
}
