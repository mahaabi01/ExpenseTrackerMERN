const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");
const emailManager = require("../../../managers/emailManager");

const register = async (req, res) => {
  const userModel = mongoose.model("users");
  const { email, password, confirm_password, name, balance } = req.body;

  //validations..
  if (!email) throw "Please provide email.";
  if (!password) throw "Password must be provided.";
  if (password.length < 5) throw "Password must be at least 5 character long.";
  if (!name) throw "Name must be provided.";
  if (password !== confirm_password)
    throw "Password and confirm password doesnot matched.";

  const getDuplicateEmail = await userModel.findOne({
    email: email,
  });
  if (getDuplicateEmail) throw "This email already exist.";

  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = await userModel.create({
    name: name,
    email: email,
    password: hashedPassword,
    balance: balance,
  });

  //jwt
  const accessToken = jwtManager(createdUser);

  await emailManager(
    createdUser.email,
    "Welcome to expense tracker web app. We hope you get help from our application.",
    "<h1> THis email is send from Abilash's desktop</h1><br><br><hr>",
    "Welcome to Expense tracket pro !"
  );
  res.status(200).json({
    success: "true",
    message: "User registrated successfully.",
    accessToken: accessToken,
  });
};
module.exports = register;
