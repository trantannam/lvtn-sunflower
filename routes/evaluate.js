const express = require('express');
const router = express.Router();

const ratingController = require('../app/controllers/RatingController');

router.get('/customer/:id', ratingController.getRatingByCustomer);
router.get('/product/:id', ratingController.getRatingByProduct);
router.post('/create', ratingController.postRating);

module.exports = router;