const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const expenseScheme = new Schema({
  place: String,
  date: Date,
  cost: Number    
});

module.exports = Expense = mongoose.model('Expense', expenseScheme );