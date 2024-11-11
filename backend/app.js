const express = require("express");
const app = express();
const userApi = require("./routes/user");
const cookieParser = require("cookie-parser");
const CatApi = require("./routes/categories");
const PodcastApi = require("./routes/podcast");
const cors = require("cors");
require("dotenv").config();
require("./conn/conn");
app.use(cors({
    origin: ["http://127.0.0.1:5173"],
    credentials: true,               
  }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads",express.static("uploads"));

//all routes
app.use("/api/v1",userApi);
app.use("/api/v1",CatApi);
app.use("/api/v1",PodcastApi);
// /api/v1/sign-up
app.listen(process.env.PORT,()=>{
    console.log(`server started on port : ${process.env.PORT}`);
});

