import { useLocation } from "react-router-dom";

export default function TestProfile() {
  const location = useLocation();
  const dataname = location.state.name;
  console.log(dataname, location.pathname);
  return <h1>hallo </h1>;
}
