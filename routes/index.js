const producttypeRouter = require('./producttype');
const deliveryRouter = require('./deliveryaddress');
const productRouter = require('./product');
const siteRouter = require('./site');
const customerRouter = require('./customer');
const cartRouter = require('./cart');
const commentRouter = require('./comment');
const puchaseorderRouter = require('./purchaseorder');
const paymentRouter = require('./payment');
const express = require('express');


function route(app) {
    app.use('/payment', paymentRouter)
    app.use('/delivery', deliveryRouter)
    app.use('/purchaseorder', puchaseorderRouter)
    app.use('/comment', commentRouter);
    app.use('/cart', cartRouter);
    app.use('/img', express.static('img'));
    app.use('/customer', customerRouter);
    app.use('/producttype', producttypeRouter);
    app.use('/product', productRouter);
    app.use('/', siteRouter);

}

module.exports = route;