const mongoose = require("mongoose");
const validator = require("validator")

const editTransaction = async  (req, res) => {
  const transactionModel = mongoose.model("transactions");


  //destructuring remarks, amount and transaction type
  const {transaction_id, remarks, amount, transaction_type} = req.body;
  if((transaction_type!=="income") || (transaction_type!=="expense")) throw "Invalid transaction_type";
  if(!transaction_id) throw "Transaction id is required.";
  if(!validator.isMongoId(transaction_id.toString())) throw "Please provide valid transaction id.";

  const getTransaction = await transactionModel.findOne({
    _id: transaction_id,
  });
  if (!getTransaction) throw "Transaction not found !";


  await transactionModel.updateOne({
    _id: transaction_id,
  },
  {
    remarks
  },{
    runValidators: true,
  });
  res.status(200).json({
    success: "true",
    message: "Transaction updated successfully."
  })
}
module.exports = editTransaction;