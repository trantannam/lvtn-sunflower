const Product = require('../models/Product');


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
    index: async (req, res) =>{
        Product.find({}, function (err, products){
            if(!err){
                return res.json({
                    success: true,
                    message: 'successfully',
                    data: products
                });
            } else {
                return res.status(400).json({error: 'ERROR!!!'})
            }
        })
        .populate('product_type');
    },

    getProductById: async (req, res) => {
        Product.findById(req.params.id)
        .populate('product_type')
        .then( (result) => {
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
    }
};

module.exports = ProductController;