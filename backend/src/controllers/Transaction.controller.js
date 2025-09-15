const { default: mongoose } = require("mongoose");
const Transaction = require("../models/Transaction");
const { register } = require("./User.controller");

exports.createTransaction = (req, res) => {
  const { amount, description, category, type } = req.body;
  const newTransaction = new Transaction({
    amount,
    description,
    category,
    userId: req.user.id,
    type,
  });
  newTransaction
    .save()
    .then(() =>
      res.status(201).json({ message: "Transaction created successfully" })
    )
    .catch((error) => res.status(500).json({ error: error.message }));
};
exports.getTransactions = (req, res) => {
  Transaction.find({ userId: req.user.id })
    .then((transactions) => res.status(200).json(transactions))
    .catch((error) => res.status(500).json({ error: error.message }));
};
exports.deleteTransaction = (req, res) => {
  const { id } = req.params;
  Transaction.findOneAndDelete({ _id: id, userId: req.user.id })
    .then((transaction) => {
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      res.status(200).json({ message: "Transaction deleted successfully" });
    })
    .catch((error) => res.status(500).json({ error: error.message }));
};

exports.updateTransaction = (req, res) => {
  const { id } = req.params;
  const { amount, description, category, type } = req.body;
  Transaction.findOneAndUpdate(
    { _id: id, userId: req.user.id },
    { amount, description, category, type },
    { new: true }
  )
    .then((transaction) => {
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      res
        .status(200)
        .json({ message: "Transaction updated successfully", transaction });
    })
    .catch((error) => res.status(500).json({ error: error.message }));
};

exports.getTransactionById = (req, res) => {
  const { id } = req.params;
  Transaction.findOne({ _id: id, userId: req.user.id })
    .then((transaction) => {
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      res.status(200).json(transaction);
    })
    .catch((error) => res.status(500).json({ error: error.message }));
};

exports.getBalance = async (req, res) => {
  const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );
  const endOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  );
  const summary = await Transaction.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(req.user.id),
        date: { $gte: startOfMonth, $lte: endOfMonth },
      },
    },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);

  let income = 0;
  let expense = 0;
  console.log(summary);

  summary.forEach((item) => {
    if (item._id === "income") income = item.total;
    if (item._id === "expense") expense = item.total;
  });

  const balance = income - expense;

  res.status(200).json({ income, expense, balance });
};
