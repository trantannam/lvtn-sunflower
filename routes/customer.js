const express = require('express');
const router = express.Router();

const customerController = require('../app/controllers/CustomerControllers');
const middlewareController = require('../app/controllers/middlewareControler');

router.post('/register', customerController.register);
router.post('/login', customerController.login);
router.post('/refresh', customerController.requestRefreshToken);
router.post('/logout',middlewareController.verifyToken, customerController.logout);
router.get('/', middlewareController.verifyToken, customerController.getAllCustomer);



module.exports = router;