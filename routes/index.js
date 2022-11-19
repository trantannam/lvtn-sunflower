const producttypeRouter = require('./producttype');
const productRouter = require('./product');
const siteRouter = require('./site');
const customerRouter = require('./customer');
const cartRouter = require('./cart');
const express = require('express');


function route(app) {
    app.use('/cart', cartRouter);
    app.use('/img', express.static('img'));
    app.use('/customer', customerRouter);
    app.use('/producttype', producttypeRouter);
    app.use('/product', productRouter);
    app.use('/', siteRouter);

}

module.exports = route;