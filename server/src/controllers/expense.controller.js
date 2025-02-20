const Expense = require("../models/expense.model");

const expenseController = {};

expenseController.get = async (req, res, next) => {
  const { user } = req;

  const now = new Date();

  const month = parseInt(req.params.month);
  if (month && month >= 0 && month <= 11)
    //Months from 0~11
    now.setMonth(month);
    
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const query = {
    owner: user._id,
    created: {
      $gte: firstDay,
      $lt: lastDay
    }
  };

  try {
    const expense = await Expense.find(query).sort({ created: 'desc' });
    return res.send({
      expense
    });
  } catch (e) {
    next(e);
  }
};

expenseController.create = async (req, res, next) => {
  const { amount, description, created } = req.body;
  const newExpense = new Expense({
    amount,
    description,
    created,
    owner: req.user
  });

  try {
    // const fakeErr = new Error("Failed to save");
    // return next(fakeErr);
    const saved = await newExpense.save();
    return res.send({
      success: true,
      expense: saved
    });
  } catch (e) {
    next(e);
  }
};

expenseController.update = async (req, res, next) => {
  const expense_id = req.params.expense_id;
  const { amount, description, created } = req.body;

  try {
    const check = await Expense.findOne({ _id: expense_id });
    if (!check.owner.equals(req.user._id)) {
      const err = new Error("This exepense object does not belong to you!");
      err.status = 401;
      console.log("error");
      throw err;
    }

    const expense = await Expense.update(
      { _id: expense_id },
      { amount, description, created }
    );
    return res.send({
      success: true,
      expense
    });
  } catch (e) {
    next(e);
  }
};

expenseController.destroy = async (req, res, next) => {
  const expense_id = req.params.expense_id;

  const check = await Expense.findOne({ _id: expense_id });
  if (!check.owner.equals(req.user._id)) {
    const err = new Error("This exepense object does not belong to you!");
    err.status = 401;
    console.log("error");
    throw err;
  }

  try {
    await Expense.deleteOne({ _id: expense_id });
    res.send({
      success: true
    });
  } catch (e) {
    next(e);
  }
};

module.exports = expenseController;
