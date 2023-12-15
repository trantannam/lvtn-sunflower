const ProductType = require('../models/ProductType');

const ProductTypeControllers = {

    index: (req, res) => {
        ProductType.find({}, function (err, product_type) {
            if (!err) {
                res.json({
                    success: true,
                    message: 'successfully',
                    data: product_type
                });
            } else {
                res.status(400).json({ error: 'ERROR!!!' })
            }
        });
    },

    getById: async (req, res) => {
        ProductType.findById(req.params.id)
            .then((result) => {
                return res.json({
                    success: true,
                    message: 'successfully!',
                    productType: result
                })
            })
            .catch(err => {
                return res.status(500).json({
                    error: err
                })
            })
    },

    createType: async (req, res) => {
        try {
            const type = new ProductType(req.body);
            if (type) {
                const data = await type.save();
                res.send({ message: "Create new type successfully!", productType: data, success: true })
            } else {
                res.status(400).json({ error: 'ERROR!!!' })
            }
        } catch (error) {
            res.status(400).json({ error: 'ERROR!!!' })
        }
    },

    updateType: async (req, res) => {
        await ProductType.findByIdAndUpdate(req.params.id, { name: req.body.name })
            .then((result) => {
                return res.json({
                    success: true,
                    message: 'successfully!',
                    productType: result
                })
            })
            .catch(err => {
                return res.status(500).json({
                    error: err
                })
            })
    },

    delete: async (req, res) => {
        await ProductType.findByIdAndDelete(req.params.id)
            .then((result) => {
                return res.json({
                    success: true,
                    message: 'successfully!',
                    productType: result
                })
            })
            .catch(err => {
                return res.status(500).json({
                    error: err
                })
            })
    }
}

module.exports = ProductTypeControllers;