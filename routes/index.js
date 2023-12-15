const productTypeRouter = require('./product-type');
const deliveryRouter = require('./delivery-address');
const productRouter = require('./product');
const siteRouter = require('./site');
const customerRouter = require('./customer');
const cartRouter = require('./cart');
const commentRouter = require('./comment');
const purchaseOrderRouter = require('./purchase-order');
const paymentRouter = require('./payment');
const staffRouter = require('./staff');
const dashboardRouter = require('./dashboard')
const ratingRouter = require('./evaluate');
const express = require('express');


function route(app) {
    app.use('/payment', paymentRouter)
    app.use('/delivery', deliveryRouter)
    app.use('/purchase-order', purchaseOrderRouter)
    app.use('/comment', commentRouter);
    app.use('/cart', cartRouter);
    app.use('/img', express.static('img'));
    app.use('/customer', customerRouter);
    app.use('/product-type', productTypeRouter);
    app.use('/product', productRouter);
    app.use('/staff', staffRouter);
    app.use('/dashboard', dashboardRouter)
    app.use('/evaluate', ratingRouter)
    app.use('/', siteRouter);

}

module.exports = route;