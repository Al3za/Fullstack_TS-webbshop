import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { user_interface } from "@webbshop-app/shared";
import "../App.css";

axios.defaults.baseURL = "http://localhost:4000";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [res, setRes] = useState<string | user_interface>("");

  const navigate = useNavigate();

  const sendToBackend = async (): Promise<void | string> => {
    console.log(username, password);
    const send = await axios.post<user_interface>("/login", {
      username,
      password,
    });

    if (typeof send.data === "object") {
      const token = send.data.token;
      localStorage.setItem("jwt", token);
      //setRes("");
      navigate("/products");
    }

    setRes(send.data);
    const sen = await axios.get("/CreateUser/sale");
  };

  const jwtToken = localStorage.getItem("jwt");

  return (
    <div className="LoginPage">
      <h1 className="LoginTitle">LoginPage</h1>
      <form className="px-4 py-3">
        <div className="form-group">
          <label>username </label>
          <input
            className="form-control"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="example"
          />
        </div>
        <div className="form-group">
          <label>password </label>
          <input
            className="form-control"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******"
          />
        </div>
      </form>

      <div className="login">
        <button className="btn btn-primary" onClick={(e) => sendToBackend()}>
          {" "}
          login{" "}
        </button>
        {jwtToken ? (
          <button className="btn btn-danger" onClick={(e) => navigate("/")}>
            update user
          </button>
        ) : (
          ""
        )}
        <button
          className="btn btn-success"
          onClick={(e) => [localStorage.removeItem("jwt"), navigate("/")]}
        >
          {" "}
          create new user{" "}
        </button>
      </div>
      <> {res}</>
    </div>
  );
}
