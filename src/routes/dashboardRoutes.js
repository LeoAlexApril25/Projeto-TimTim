const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Rota para obter os dados do dashboard
router.get('/summary', dashboardController.getSummary);

module.exports = router;