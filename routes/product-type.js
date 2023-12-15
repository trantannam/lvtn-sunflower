const express = require('express');
const router = express.Router();

const productTypeController = require('../app/controllers/ProductTypeControllers');

router.delete('/delete/:id', productTypeController.delete)
router.put('/update/:id', productTypeController.updateType)
router.get('/:id', productTypeController.getById)
router.post('/create', productTypeController.createType)
router.get('/', productTypeController.index)


module.exports = router;