const express = require('express');
const router = express.Router();
const productionController = require('../controllers/productionController');

router.post('/', productionController.create);
router.get('/', productionController.getAll);

module.exports = router;