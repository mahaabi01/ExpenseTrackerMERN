const express = require("express");
const register = require("./controllers/register");
const login = require("./controllers/login");
const userDashboard = require("./controllers/userDashboard");
const auth = require("../../middleware/auth");
const forgotPassword = require("./controllers/forgotPassword");
const resetPassword = require("../transactions/controllers/resetPassword");

const userRoute = express.Router();

//Routes
userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.post("/forgotpassword", forgotPassword);
userRoute.post("/resetpassword", resetPassword);
//using middleware
userRoute.use(auth);
userRoute.get("/dashboard", userDashboard);

module.exports = userRoute;