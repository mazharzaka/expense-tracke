const Transaction = require("../models/Transaction");

exports.createTransaction = (req, res) => {
  const { amount, description, category, type } = req.body;
  const newTransaction = new Transaction({
    amount,
    description,
    category,
    userId: req.user._id,
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
  Transaction.find({ userId: req.user._id })
    .then((transactions) => res.status(200).json(transactions))
    .catch((error) => res.status(500).json({ error: error.message }));
};
exports.deleteTransaction = (req, res) => {
  const { id } = req.params;
  Transaction.findOneAndDelete({ _id: id, userId: req.user._id })
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
    { _id: id, userId: req.user._id },
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
  Transaction.findOne({ _id: id, userId: req.user._id })
    .then((transaction) => {
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      res.status(200).json(transaction);
    })
    .catch((error) => res.status(500).json({ error: error.message }));
};
