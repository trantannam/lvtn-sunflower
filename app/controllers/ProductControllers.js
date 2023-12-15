const Product = require('../models/Product');
const mongoose = require('mongoose');
const path = '/images/products/'

const ProductController = {

    // ADD
    addProduct: async (req, res) => {
        try {
            const data = new Product({
                name: req.body.name,
                price: req.body.price,
                amount: req.body.amount,
                image: req.body.image,
                description: req.body.description,
                product_type: req.body.product_type,
            });
            const save = await data.save();
            if (save) {
                return res.status(200).json({
                    success: true,
                    message: 'successfully'
                });
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // get product
    index: async (req, res) => {
        Product.find({}, function (err, products) {
            if (!err) {
                return res.json({
                    success: true,
                    message: 'successfully',
                    data: products
                });
            } else {
                return res.status(400).json({ error: 'ERROR!!!' })
            }
        })
            .populate('product_type');
    },

    // getProductByTypeProductId: async (req, res) => {
    //     Product.find({
    //         product_type: req.params.id
    //     })
    // },

    getProductById: async (req, res) => {
        Product.findById(req.params.id)
            .populate('product_type')
            .then((result) => {
                return res.json({
                    success: true,
                    message: 'successfully!',
                    data: result
                })
            })
            .catch(err => {
                return res.status(500).json({
                    error: err
                })
            })
    },

    updateProduct: async (req, res) => {
        const { id } = req.params
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send({ message: 'Product Not Found', success: false });
        }
        const session = await mongoose.startSession()
        session.startTransaction()
        try {
            const {
                name,
                price,
                amount,
                description,
                product_type
            } = req.body

            product.product_name = name
            product.price = price
            product.amount = amount
            product.description = description
            product.product_type = product_type
            const update = await product.save({ session })
            if (!update) {
                return res.status(404).send({ error: 'Error saving product', success: false })
            }
            await session.commitTransaction()
            await session.endSession()
            return res.send({ data: update, success: true })
        } catch (e) {
            await session.abortTransaction()
            await session.endSession()
            return res.status(404).send({ error: e.message, success: false })
        }
    },

    updateProductImage: async (req, res) => {
        const { id } = req.params
        try {
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).send({ data: "Không tìm thấy sản phẩm", success: false })
            }
            product.image = req.file.path;
            const updatedProduct = await product.save();
            if (!updatedProduct) {
                return res.status(404).send({ data: "Không thể cập nhật", success: false })
            }
            return res.send({ data: "Cập nhật thành công", success: true })
        } catch (e) {
            return res.status(404).send({ data: e.message, success: false })
        }
    },

    createImgProduct: async (req, res) => {
        try {
            const file = req.file;
            if (!file) {
                return res.status(404).send({ message: "Không thể lưu ảnh đã gửi", success: false })
            }
            res.send({
                message: "Uploaded",
                uri: `/img/product/${file.filename}`,
                success: true
            })
        } catch (error) {
            return res.status(500).send({ data: error.message, success: false })
        }
    },

    createProduct: async (req, res) => {
        try {
            const {
                product_name,
                price,
                image,
                amount,
                description,
                product_type,
            } = req.body
            console.log("body", req.body)
            const product = new Product({
                product_name: product_name,
                price: price,
                amount: amount,
                image: image,
                description: description,
                product_type: product_type,
            });
            const newProduct = await product.save()
            if (!newProduct) {
                return res.status(404).send({ error: 'Error saving product', success: false })
            }
            return res.send({ product: newProduct, success: true, message: "Cập nhật thành công", })
        } catch (error) {
            return res.status(500).send({ data: error.message, success: false })
        }
    }
};

module.exports = ProductController;