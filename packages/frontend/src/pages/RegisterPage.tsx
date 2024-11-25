import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { user_interface } from "@webbshop-app/shared";
import axios from "axios";

axios.defaults.baseURL = process.env.WEBBSHOP_API || "http://localhost:4000";
// maybe "proxy": "http://localhost:3001/", needs in frontend package.json
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

  const navigate = useNavigate();

  const sendToBackend = async (): Promise<void> => {
    const send = await axios.post<user_interface | string>("/CreateUser", {
      username,
      mail,
      phoneNr,
      address,
      password,
    });

    const getData = send.data;

    if (getData === username) {
      navigate("/login");
    }
    setRes(getData);
  };

  const checkToken = localStorage.getItem("jwt");

  return (
    <div className="SignContainer">
      <h1>RegisterPage</h1>
      <div className="Register">
        <input
          type="text"
          value={username}
          placeholder="USERNAME"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="MAIL"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <br />
        <input
          type="number"
          placeholder="PHONE NUMBER"
          value={phoneNr}
          onChange={(e) => setPhoneNr(Number(e.target.value))}
        />
        <br />
        <input
          type="text"
          placeholder="ADDRESS"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <br />

        <input
          type="text"
          placeholder="PASSWORD"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
      </div>
      <div>
        <>{res} </>
      </div>
      <div className="buttonToLogin">
        {!checkToken ? (
          <button
            disabled={!(username && mail && phoneNr && address && password)}
            onClick={(e) => sendToBackend()}
          >
            Send
          </button>
        ) : (
          <button onClick={(e) => sendToBackend()}> update user </button>
        )}
        <button onClick={(e) => navigate("/login")}> go to login </button>
      </div>
    </div>
  );
}
