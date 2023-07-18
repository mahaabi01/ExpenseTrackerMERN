const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const emailManager = require("../../../managers/emailManager");
const resetPassword = async (req, res) => {
  const userModel = mongoose.model("users");
  const { email, new_password, reset_code } = req.body;
  if (!email) throw "Email is required.";
  if (!new_password) throw "Please provide new password.";
  if (!reset_code) throw "Please provide reset Code.";
  if (new_password.length < 5) throw "Password must be at lease 5 characters.";

  const getUserWithResetCode = await userModel.findOne({
    email: email,
    reset_code: reset_code,
  });
  if (!getUserWithResetCode) throw "Reset code doesnot matched.";

  const hashedPassword = await bcrypt.hash(new_password, 10);

  await userModel.updateOne(
    {
      email: email,
    },
    {
      password: hashedPassword,
      reset_code: "",
    },
    {
      runValidators: true,
    }
  );


  await emailManager(
    email,
    "Your password is reseted successfully! If you have not done that, please contact admin.",
    "Your password is reseted successfully! If you have not done that, please contact admin.",
    "ExpenseTracketPro - Password reset successfully!"
  );
  res.status(200).json({
    success: "true",
    message: "Password reseted successfully.",
  });
};

module.exports = resetPassword;
