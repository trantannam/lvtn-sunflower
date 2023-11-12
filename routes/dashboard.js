const express = require('express');
const DashBoardController = require('../app/controllers/DashBoardController');
const router = express.Router();



router.get('/summary', DashBoardController.summary);
router.post('/chart', DashBoardController.chart);

module.exports = router;