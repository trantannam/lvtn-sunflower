const ProductType = require('../models/ProductType');

class ProductTypeControllers {

    index(req, res){
        ProductType.find({}, function (err, product_type){
            if(!err){
                res.json({
                    success: true,
                    message: 'successfully',
                    data: product_type
                });
            }else{
                res.status(400).json({error: 'ERROR!!!'})
            }
        });
    }
}

module.exports = new ProductTypeControllers();