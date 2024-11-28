import React from "react";
import { Link } from "react-router-dom";

export default function TestPage() {
  const dataname = {
    name: "alessandro",
  };

  return (
    <div>
      <h1> pass data </h1>
      <Link to={"/profile"} state={dataname}>
        {" "}
        {/* state is a property of Link, and i can ge the data inside this property using useLocation hook (see testProfile) 
        This way we pass props by Router to different element in the App
        */}
        go to link
      </Link>
    </div>
  );
}
