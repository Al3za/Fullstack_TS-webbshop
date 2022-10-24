import express, { Application, json } from "express";
import cors from "cors";
import User_Controller, { UserLogin } from "./Controllers/User_Controllers";
import { setUpMongoDb } from "./Models/userModel";
import { autenticateToken } from "./services/userVerify";
//import itemRouter from "./Controllers/itemTest";

const app: Application = express();
const mongoUrl: string =
  process.env.MONGO_DB_URL || "mongodb://localhost:27017/webbshop";

app.use(cors());
app.use(json());
app.use(autenticateToken);
app.post("/login", UserLogin);

app.use("/CreateUser", User_Controller);
//app.use("/testToken", itemRouter);

const port: number = parseInt(process.env.SERVER_PORT || "4000");

app.listen(port, async function () {
  await setUpMongoDb(mongoUrl);
  console.log(`App is listening on port ${port} !`);
});
