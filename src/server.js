import express from "express";
//giup server lay duoc cac tham so:query,params
import bodyParser from "body-parser";
//view engine
import configViewEngine from "../src/config/viewEngine";
//web router
import initWebRoutes from "../src/route/web";
//connect DB
import connectDB from "../src/config/connectDB";
//cors
import cors from "cors";
require("dotenv").config();

let app = express();
//use cors giup client co the gui request den api cua chinh server nam tren cung 1 localhost
app.use(cors({ credentials: true, origin: true }));
//tham so port
let port = process.env.PORT || 8080;
//config app bạn có thể lấy được data form từ req.body(cau hinh cac tham so client gui len)
//limit de co the gui file len server tu fe
app.use(express.json({ limit: "50mb" }));
//
app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

configViewEngine(app);
initWebRoutes(app);
// connect DB
connectDB();

app.listen(port, () => {
  console.log(`Backend Nodejs is running on http://localhost:${port}`);
});
//cors https://anonystick.com/blog-developer/cors-la-gi-15-buc-anh-chuyen-dong-tinh-te-giup-ban-hieu-ro-ve-cors-2020080892125886
