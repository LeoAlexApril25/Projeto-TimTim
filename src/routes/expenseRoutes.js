const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.post('/', expenseController.create);
router.get('/', expenseController.getAll);

module.exports = router;