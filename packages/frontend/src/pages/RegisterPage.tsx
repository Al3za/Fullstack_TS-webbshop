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

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.request.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // create a function to refresh the token and store it in
        console.log("accessToken interceptor so far");
        const resp = await generateRefreshToken(); // when the httpOnly cookies expires it ll lead to an endless loop (has to be fixed)
        const AccessToken = await resp; //.AccessToken;
        console.log(AccessToken, "accessToken interceptor");
        if (AccessToken.message) {
          alert("Please log In before using the app");
          return; // find a way to redirect user to ligin at this point
        }
        localStorage.removeItem("jwt"); // find a way to set cookies in react
        localStorage.setItem("jwt", AccessToken?.AccessToken);
        // document.cookie = `AccessToken = ${accessToken}  expires= Mon, 10 Dec 2024 20:00:00 UTC path=/`; // the jwt token stored inside this cookie expires after one minute
        axios.defaults.headers.common[
          "authorization"
        ] = `Bearer ${AccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        alert(refreshError);
      }
    }
  }
);

const generateRefreshToken = async () => {
  // call the refreshEndpoint
  try {
    const response = await axios.get("/refresh", {
      withCredentials: true, //  send the httpOnly cookies to for verify purpuse
    });
    const { data } = response;
    console.log(data, "refreshData");
    return await data;
  } catch (error) {
    console.error(error);
  }
};

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
