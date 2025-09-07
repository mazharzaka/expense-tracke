const transactionController = require("../controllers/Transaction.controller");
const express = require("express");
const routerTransaction = express.Router();
const { verifyToken } = require("../middleware/auth.middle");

routerTransaction.post(
  "/",
  verifyToken,
  transactionController.createTransaction
);
routerTransaction.get("/", verifyToken, transactionController.getTransactions);
routerTransaction.delete(
  "/:id",
  verifyToken,
  transactionController.deleteTransaction
);
routerTransaction.put(
  "/:id",
  verifyToken,
  transactionController.updateTransaction
);
routerTransaction.get(
  "/:id",
  verifyToken,
  transactionController.getTransactionById
);

module.exports = routerTransaction;
