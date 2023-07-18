const express = require("express");
const auth = require("../../middleware/auth");
const addIncome = require("./controllers/addIncome");
const addExpense = require("./controllers/addExpense");
const getTransaction = require("./controllers/getTransaction");
const deleteTransaction = require("./controllers/deleteTransaction");
const editTransaction = require("./controllers/editTransaction");

const transactionRoutes = express.Router();


//using middleware
transactionRoutes.use(auth);

//protected routes
transactionRoutes.post("/addincome", addIncome);
transactionRoutes.post("/addexpense", addExpense);
transactionRoutes.get("/", getTransaction);
transactionRoutes.delete("/:transaction_id", deleteTransaction);
transactionRoutes.patch("/", editTransaction);

module.exports = transactionRoutes;