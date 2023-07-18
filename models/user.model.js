const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Password is required."],
  },
  balance: {
    type: Number,
    require: [true, "Balance is require."],
    default: 0,
  },
  reset_code:{
    type: Number,
  },
},{
  timestamps: true,
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
