const Expense = require('../../db/models/expense/index');

module.exports.getAllExpense = (req, res, next) => {
  Expense.find().then(result => {
    res.send(result);    
  });
};
module.exports.createExpense = (req, res, next) => {
  const expense = new Expense(req.body);
  expense.save().then(result => {  
    res.send(expense);
  }).catch(err => console.log(err));
 };

 module.exports.changeExpense = (req, res, next) => {  
  const body = req.body;
  Expense.updateOne(
    {_id: body._id},
      body 
    ).then(result => {
    Expense.find().then(result => {
      res.send(result);
    });    
  });
};

module.exports.deleteExpense = (req, res, next) => {
  const queryId = req.query._id;
  Expense.deleteOne({_id: queryId}).then(result => { 
    Expense.find().then(result => {          
      res.send(result);                 
    });   
  });
};

 