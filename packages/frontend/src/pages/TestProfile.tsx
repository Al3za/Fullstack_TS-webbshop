import { useLocation } from "react-router-dom";

export default function TestProfile() {
  const location = useLocation();
  const dataname = location.state.name;
  const zes = window.history.state; // the session id everytime we get to this page url change
  console.log(zes, "zes");
  console.log(dataname, location.pathname);
  return <h1>hallo </h1>;
}
