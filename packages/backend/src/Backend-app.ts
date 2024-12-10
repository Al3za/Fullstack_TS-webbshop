import express, { Application, json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; //npm install --save-dev @types/cookie-parser
import User_Controller, { UserLogin } from "./Controllers/User_Controllers";
import { setUpMongoDb } from "./Models/userModel";
import { autenticateToken, refreshToken } from "./services/userVerify";
import addToCardProduct from "./Controllers/addToCard";
import Buyed_Item from "./Controllers/BuyedCartItems";
import { corsOptions } from "./config/corsOptions";
//import 'dotenv/config'

//console.log(process.env.JWT_SECRET, 'accessKey', process.env.REFRESHTOKEN, 'REFRESHTOKEN')
const app: Application = express();

const mongoUrl: string =
  process.env.MONGO_DB_URL || "mongodb://localhost:27017/webbshop";

app.use(cors(corsOptions)); // setting proper cors options allow the HttpOnly to be seen in client webTools
app.use(json());
app.use(cookieParser());
app.post("/login", UserLogin);
app.get("/refresh", refreshToken);
app.use(autenticateToken); // this middleware applies for every request made in towards the routes below 
app.use("/CreateUser", User_Controller);
app.use("/addToCartProducts", addToCardProduct);
app.use("/BuyedItem", Buyed_Item);

export const checkUrl = mongoUrl;

const port: number = parseInt(process.env.SERVER_PORT || "4000"); //5000
// backend-1 image on status of the image on docker compose will not work if i change port number to 4000; find out why

app.listen(port, async function () {
  await setUpMongoDb(mongoUrl);
  console.log(`App is listening on port ${port} !`);
});
