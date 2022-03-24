const express = require('express');
const router = express.Router();

const {
  getAllExpense,
  createExpense,
  changeExpense,
  deleteExpense
} = require('../controllers/expense.controller');

router.get('/allExp', getAllExpense);
router.post('/CreateExp', createExpense );
router.patch('/updateExp', changeExpense);
router.delete('/deleteExp', deleteExpense);

module.exports = router;
