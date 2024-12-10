import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { user_interface } from "@webbshop-app/shared";

axios.defaults.baseURL = "http://localhost:4000";

//console.log(Datas, "hej");

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [res, setRes] = useState<string | user_interface>("");

  const navigate = useNavigate();

  const LoginUser = async (): Promise<void | string> => {
    // we promise to return a string or nothing from that post fetch
    try {
      const send = await axios.post<string /*user_interface*/>(
        "/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      console.log(send.data, "send.data");
      // if (send.status === 200) {
      const token = send.data;
      //  console.log(token, "token");
      localStorage.setItem("jwt", token);
      // Cookies.set("MyCookie", "value", { expires: 7 });
      navigate("/products");
      // }
    } catch (error) {
      alert("make sure you wrote right username & password");
    }

    // console.log(send.status);

    // if (send.status === 401) {
    //   console.log(send.data, "hfhfh");
    // }
    //  setRes(send.data);
  };

  return (
    <div className="SignContainer">
      <h1>LoginPage</h1>
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
          value={password}
          placeholder="PASSWORD"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* <div>
          <button onClick={(e) => navigate("/")}>
            back to registerPage & update user{" "}
          </button>
        </div> */}
        {/* <button
          onClick={(e) => [localStorage.removeItem("jwt"), navigate("/")]}
        >
          back to registerPage & create new user
        </button> */}
      </div>
      <div className="buttonToLogin">
        <button disabled={!(username && password)} onClick={(e) => LoginUser()}>
          login
        </button>{" "}
        {/* <button onClick={(e) => navigate("/")}>back to registerPage</button> */}
      </div>
      <div className="buttonToLogin">
        <button onClick={(e) => navigate("/")}>back to registerPage</button>{" "}
      </div>
      <> {res}</>
    </div>
  );
}
