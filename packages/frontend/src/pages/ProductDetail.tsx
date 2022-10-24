import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import storeItems from "../data/items.json";

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

export function ProductDetail() {
  const { id } = useParams();
  const item = storeItems.find((item) => item.id == id);
  console.warn(item);

  return (
    <Card>
      <h1>Detail Page</h1>
      <Card.Img
        variant="top"
        src={item?.imgUrl}
        height="500px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{item?.name}</span>
          <span className="ms-2 text-muted">Price : ${item?.price}</span>
          <span className="ms-2 text-muted"> {item?.description}</span>
          <span className="ms-2 text-muted"> {item?.kategori}</span>
          <span className="ms-2 text-muted"> {item?.weight}</span>
          <span className="ms-2 text-muted"> {item?.manufacturer}</span>
        </Card.Title>
      </Card.Body>
    </Card>
  );
}
