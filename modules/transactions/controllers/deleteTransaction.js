const mongoose = require("mongoose");
const validator = require("validator");

const deleteTransaction = async (req, res) => {
  const userModel = mongoose.model("users");
  const transactionModel = mongoose.model("transactions");
  const { transaction_id } = req.params;

  if (!validator.isMongoId(transaction_id.toString()))
    throw "Please provide valid mongo ID.";

  const getTransaction = await transactionModel.findOne({
    _id: transaction_id,
  });

  if (!getTransaction) throw "Transaction not found !";

  //delete code
  console.log(getTransaction);
  if (getTransaction.transaction_type == "income") {
    await userModel.updateOne(
      {
        _id: getTransaction.user_id,
      },
      {
        $inc: {
          balance: getTransaction.amount * -1,
        },
      },
      {
        runValidators: true,
      }
    );
  } else {
    await userModel.updateOne(
      {
        _id: getTransaction.user_id,
      },
      {
        $inc: {
          balance: getTransaction.amount,
        },
      },
      {
        runValidators: true,
      }
    );
  }
  // await transactionModel.deleteOne({
  //   _id : transaction_id,
  // });

  res.status(200).json({
    success: "true",
    message: "Hello from deleteTransaction section.",
  });
};
module.exports = deleteTransaction;
