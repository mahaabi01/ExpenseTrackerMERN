const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const jwtManager = require("../../../managers/jwtManager");
require("dotenv").config();

const login = async (req, res) => {
  const userModel = mongoose.model("users");
  const { email, password } = req.body;
  const getUser = await userModel.findOne({
    email: email,
  });
  if (!getUser) throw "Email doesnot exist.";
  const comparePassword = await bcrypt.compare(password, getUser.password);
  if (!comparePassword) throw "Email and password donot matched.";

  const accessToken = jwtManager(getUser);
  //success message
  res.status(200).json({
    success: "true",
    message: "Log in platform.",
    accessToken: accessToken,
  });
};

module.exports = login;
