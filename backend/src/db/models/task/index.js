const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskScheme = new Schema({
  name: String,
  date: Date,
  cost: Number    
});

module.exports = Accountings = mongoose.model('Accountings', taskScheme );