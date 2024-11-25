// import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import storeItems from "../data/items.json";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const { id } = useParams();
  const item = storeItems.find((item) => item.id === Number(id));

  return (
    <div>
      <h1 className="DetailTitle">Detail Page</h1>

      <div className="ImgContainer">
        <img src={item?.imgUrl} alt={item?.name} height="300px" />
      </div>
      <div className="DetailName">
        <span> {item?.name} </span>
      </div>
      <div className="DetailDescription">
        {/* <span className="ms-2 text-muted">Price : ${item?.price}</span> */}
        <span className="ms-2 text-muted">{item?.description}</span>
      </div>
      <div className="bodyDetails">
        <p>
          <span>Price:</span> <u>${item?.price}</u>
        </p>
        <p>
          <span>Category:</span> <u>{item?.kategori}</u>
        </p>
        <p>
          <span> Weight:</span> <u>{item?.weight}</u>
        </p>
        <p>
          <span> Manufacturer:</span> <u>{item?.manufacturer}</u>
        </p>
      </div>
      <div>
        <button onClick={(e) => navigate("/products")}>Back to Products</button>
      </div>
    </div>

    // <Card>
    //   <h1>Detail Page</h1>
    //   <Card.Img
    //     variant="top"
    //     src={item?.imgUrl}
    //     height="400px"
    //     style={{ objectFit: "cover" }}
    //   />
    //   <Card.Body className="d-flex flex-column">
    //     <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
    //       <span className="fs-2">{item?.name}</span>
    //       <span className="ms-2 text-muted">Price : ${item?.price}</span>
    //       <span className="ms-2 text-muted"> {item?.description}</span>
    //       <span className="ms-2 text-muted"> {item?.kategori}</span>
    //       <span className="ms-2 text-muted"> {item?.weight}</span>
    //       <span className="ms-2 text-muted"> {item?.manufacturer}</span>
    //     </Card.Title>
    //   </Card.Body>
    // </Card>
  );
}
