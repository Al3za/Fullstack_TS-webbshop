import { Button, Card } from "react-bootstrap";
import React from "react";

export interface StoreItemProps {
  id: number;
  name: string;
  description: string;
  kategori: string;
  weight: string;
  manufacturer: string;
  price: number;
  imgUrl: string;
}
export function StoreItem({ name, price, imgUrl }: StoreItemProps) {
  return (
    <Card>
      StoreItem
      <Card.Img
        variant="top"
        src={imgUrl}
        height="300px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">Price : ${price}</span>
        </Card.Title>
        <Button>Add To Cart</Button>
      </Card.Body>
    </Card>
  );
}
