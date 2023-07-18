require("express-async-errors");
const express = require("express");
const errorHandler = require("./handlers/errorHandler");
require("dotenv").config();
const mongoose = require("mongoose");
const userRoute = require("./modules/users/users.routes");
const transactionRoutes = require("./modules/transactions/transaction.routes");



const app = express();
mongoose.connect(process.env.mongo_connection, {}).then(()=>{
  console.log("Connection to database successful.");
}).catch(()=>{
  console.log("Mongodb connection failed.")
})


//models initialization
require("./models/user.model");
require("./models/transaction.model");
app.use(express.json());

//routes related
app.use("/api/users", userRoute);
app.use("/api/transactions", transactionRoutes);

app.all("*", (req,res,next)=>{
  res.status(404).json({
    success: "false",
    message: "404 not found!"
  })
})
//error handler
app.use(errorHandler);
app.listen(8000, ()=>{
  console.log("Server started successfully.")
})