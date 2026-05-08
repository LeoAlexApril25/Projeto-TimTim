const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { validateCustomer } = require('../middlewares/validator');

router.post('/', validateCustomer, customerController.create);
router.get('/',customerController.getAll);

module.exports = router;