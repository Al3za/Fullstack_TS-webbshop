import { Card } from "react-bootstrap";
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

//const jwtToken = localStorage.getItem("jwt");

export function StoreItem({ name, price, imgUrl }: StoreItemProps) {
  //const [buttonState, useButtonState] = useState<boolean>(true);

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
        {/* <Button disabled={true}>Add To Cart s</Button> */}
      </Card.Body>
    </Card>
  );
}
