const mongoose = require("mongoose");

const getTransaction = async(req, res) => {
  const transactionModel = mongoose.model("transactions");
  const transactions = await transactionModel.find({
    user_id: req.user._id,
    ...req.query,
  })
  res.status(200).json({
    sucess: "true",
    data: transactions
  })
}

module.exports = getTransaction;