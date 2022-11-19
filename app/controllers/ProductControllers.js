const product = require('../models/Product');


const ProductController = {

    // ADD
    addProduct: async (req, res) => {
        try {
            const data = new product({
                productname: req.body.productname,
                price: req.body.price,
                amount: req.body.amount,
                image: req.body.image,
                description: req.body.description,
                producttype: req.body.producttype,
            });
            const save = await data.save();
            res.status(200).json(save);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // get product
    index: async (req, res) =>{
                 product.find({}, function (err, products){
            if(!err){

                res.json({
                    success: true,
                    massage: 'successfully',
                    products
                });
            }else{
                res.status(400).json({error: 'ERROR!!!'})
            }
        });
    },

    getProductById: async (req, res) => {
        product.findById(req.params.id)
        .then( (result) => {
            res.status(200).json({
                success: true,
                massage: 'successfully!',
                result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
    }
};

module.exports = ProductController;