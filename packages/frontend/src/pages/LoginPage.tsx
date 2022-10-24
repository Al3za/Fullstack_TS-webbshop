import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { user_interface } from "@webbshop-app/shared";

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
  };

  return (
    <div>
      <h1>LoginPage</h1>

      <div className="login">
        username{" "}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        password{" "}
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={(e) => sendToBackend()}> login </button>
        <button onClick={(e) => navigate("/")}>back to register</button>
      </div>
      <> {res}</>
    </div>
  );
}
