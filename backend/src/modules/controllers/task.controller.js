const Task = require('../../db/models/task/index');

module.exports.getAllAccouning = (req, res, next) => {
  Task.find().then(result => {
    res.send(result);    
  });
};
module.exports.CreateNewAcc = (req, res, next) => {
  const task = new Task(req.body);
  task.save().then(result => {
   Task.find().then(result => {
     res.send(result);    
   });
  }).catch(err => console.log(err));
 };

 module.exports.ChangeAcc = (req, res, next) => {
  const bodyId = req.body._id;
  Task.updateOne({_id: bodyId}, req.body).then(result => {
    Task.find().then(result => {
      res.send(result);
    });
  });
};

module.exports.DeleteAcc = (req, res, next) => {
  const queryId = req.query._id;
  Task.deleteOne({_id: queryId}).then(result => { 
    Task.find().then(result => {          
      res.send(result);                 
    });   
  });
};

 