const mongoose = require("mongoose");

const { Schema } = mongoose;

const ExpenseSchema = Schema({
  amount: { type: Number, required: true },
  description: { type: String },
  created: { type: Date, required: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const Expense = mongoose.model("Expense", ExpenseSchema);
module.exports = Expense;

const BusinessSchema = Schema({
  name: { type: String, required: true },
  legal: { type: String, required: true },
  keyResources: {
    firstKey: { type: String },
    secondKey: { type: String },
    thirdKey: { type: String }
  },
  keyPersonnel: {
    firstKey: {
      name: { type: String },
      position: { type: String },
      expertise: { type: String }
    },
    secondKey: {
      name: { type: String },
      position: { type: String },
      expertise: { type: String }
    },
    thirdKey: {
      name: { type: String },
      position: { type: String },
      expertise: { type: String }
    }
  }
});
