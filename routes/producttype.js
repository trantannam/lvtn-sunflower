const express = require('express');
const router = express.Router();

const producttypeController = require('../app/controllers/ProducttypeControllers');

router.get('/', producttypeController.index)

module.exports = router;