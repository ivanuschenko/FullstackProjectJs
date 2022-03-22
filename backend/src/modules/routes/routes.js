const express = require('express');
const router = express.Router();

const {
  getAllAccouning,
  CreateNewAcc,
  ChangeAcc,
  DeleteAcc 
} = require('../controllers/task.controller');

router.get('/allAcc', getAllAccouning);
router.post('/CreateAcc', CreateNewAcc );
router.patch('/updateAcc', ChangeAcc);
router.delete('/deleteAcc', DeleteAcc);

module.exports = router;
