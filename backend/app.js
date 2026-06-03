import express from "express";
import dotenv from "dotenv";
import Connect from "./config/dbConnect.js";
dotenv.config({});


const app = express();

const port = process.env.PORT || 8000;

app.get("/",(req,res)=>{
     res.send("API Working");
})


Connect();
app.listen(port,()=>{
  console.log("Server is running on PORT: ",port);
})
