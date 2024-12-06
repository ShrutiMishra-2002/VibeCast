const express = require("express");
const app = express();
const userApi = require("./routes/user");
const cookieParser = require("cookie-parser");
const CatApi = require("./routes/categories");
const PodcastApi = require("./routes/podcast");
const cors = require("cors");
require("dotenv").config();
require("./conn/conn");

const allowedOrigins = ["http://localhost:5173", "https://vibecast-v9sc.onrender.com"];

app.use(cors({
    origin: (origin, callback) => {
      if(!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,   
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type"            
  }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads",express.static("uploads"));
app.options("*", cors());

//all routes
app.use("/api/v1",userApi);
app.use("/api/v1",CatApi);
app.use("/api/v1",PodcastApi);
// /api/v1/sign-up
app.listen(process.env.PORT,()=>{
    console.log(`server started on port : ${process.env.PORT}`);
});

