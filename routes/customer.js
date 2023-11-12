const express = require('express');
const router = express.Router();

const customerController = require('../app/controllers/CustomerControllers');
const middlewareController = require('../app/controllers/middlewareControler');

router.post('/register', customerController.register);
router.post('/login', customerController.login);
router.post('/refresh', customerController.requestRefreshToken);
router.post('/logout', middlewareController.verifyToken, customerController.logout);
router.post('/add-love-product', customerController.addListLoveProducts);
router.post('/remove-love-product', customerController.removeListLoveProducts);
router.get('/love-product/:id', customerController.getListLoveProducts);
router.get('/:id', customerController.getInfo);
router.get('/', customerController.getAllCustomer);



module.exports = router;