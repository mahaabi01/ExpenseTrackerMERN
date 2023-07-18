const mongoose = require("mongoose");
const emailManager = require("../../../managers/emailManager")

const forgotPassword = async (req, res) => {
  const userModel = mongoose.model("users");

  const { email } = req.body;
  if (!email) throw "Email is required.";
  const getUser = await userModel.findOne({
    email: email,
  });
  if (!getUser) throw "Email doesnot exist.";

  //OPT generation code
  const resetCode = Math.floor(10000 + Math.random() * 90000);
  await userModel.updateOne(
    {
      email: email,
    },
    {
      reset_code: resetCode,
    },
    {
      runValidators: true,
    }
  );

  //sending mail code

  await emailManager(
    email,
    "Your reset password OTP is :" + resetCode,
    "Your reset password OTP is :" + resetCode,
    "Password reset section - ExpenseTrackerPro"
  );

  res.status(200).json({
    success: "true",
    message: "Reset email send to respective mail. Please check inbox.",
  });
};

module.exports = forgotPassword;
