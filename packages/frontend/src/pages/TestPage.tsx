import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";
export default function TestPage() {
  const dataname = {
    name: "alessandro",
  };

  const getToken = async () => {
    const refreshToken = await axios.get("/addToCartProducts", {
      withCredentials: true, // we send the httpOnly cookie to refresh the accessToken
    });
    console.log("hfhfhfh", await refreshToken.data);
    if (await refreshToken.data) {
      console.log(
        // await refreshToken.data.AccessToken,
        " refreshToken.data.AccessToken"
      );
    }
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
      <button onClick={() => getToken()}> New RefreshToken </button>
    </div>
  );
}
