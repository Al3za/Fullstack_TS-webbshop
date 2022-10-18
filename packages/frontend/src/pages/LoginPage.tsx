import { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const sendToBackend = async (): Promise<void | string> => {
    const send = await axios.post("/");
  };

  return (
    <div>
      <h1>LoginPage</h1>

      <form className="login" onSubmit={sendToBackend}>
        username{" "}
        <input type="text" value={username} onChange={(e) => e.target.value} />
        password{" "}
        <input type="text" value={password} onChange={(e) => e.target.value} />
        <button type="submit"> send </button>
      </form>
    </div>
  );
}