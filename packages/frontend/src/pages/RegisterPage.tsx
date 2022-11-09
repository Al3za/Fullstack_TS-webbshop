import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { user_interface } from "@webbshop-app/shared";
import axios from "axios";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

axios.defaults.baseURL = "http://localhost:4000";

axios.interceptors.request.use((config) => {
  if (!config.headers) {
    config.headers = {};
  }
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    config.headers["authorization"] = `Bearer ${jwt}`;
  }
  return config;
});

export default function RegisterPage() {
  const [username, setUsername] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [phoneNr, setPhoneNr] = useState<number>();
  const [address, setAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [res, setRes] = useState<string | user_interface>("");
  //const [enableButton, setEnableButton] = useState<boolean>(true);

  const navigate = useNavigate();

  const sendToBackend = async (): Promise<void> => {
    const send = await axios.post<user_interface>("/CreateUser", {
      username,
      mail,
      phoneNr,
      address,
      password,
    });

    const getData = send.data;
    console.log(getData);
    setRes(getData);
    if (typeof getData === "boolean") {
      navigate("/login");
      // setEnableButton(false);
      // setRes("");
    }
  };

  const checkToken = localStorage.getItem("jwt");

  return (
    <div className="RegisterPage">
      <h1 className="RegisterTitle">RegisterPage</h1>
      <form className="px-4 py-3">
        <div className="form-group">
          <label>username </label>
          <input
            type="text"
            value={username}
            className="form-control"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="example"
          />
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            className="form-control"
            placeholder="email@example.com"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="exampleDropdownFormPassword1"
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            className="form-control"
            placeholder="1234567"
            type="number"
            value={phoneNr}
            onChange={(e) => setPhoneNr(Number(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            className="form-control"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="stockolm 24"
          />
        </div>
      </form>
      <div className="Register">
        {!checkToken ? (
          <button className="btn btn-danger" onClick={(e) => sendToBackend()}>
            {" "}
            send{" "}
          </button>
        ) : (
          <button className="btn btn-success" onClick={(e) => sendToBackend()}>
            {" "}
            update user{" "}
          </button>
        )}
      </div>
      <div>
        <>{res} </>
      </div>

      <div className="buttonToLogin">
        <button className="btn btn-primary" onClick={(e) => navigate("/login")}>
          {" "}
          go to login{" "}
        </button>
      </div>
    </div>
  );
}
