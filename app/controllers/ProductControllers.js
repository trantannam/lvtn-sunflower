const product = require('../models/Product');

class ProductController {

    index(req, res){
        product.find({}, function (err, products){
            if(!err){
                res.json({
                    success: true,
                    massage: 'successfully',
                    products}
                );
            }else{
                res.status(400).json({error: 'ERROR!!!'})
            }
        });
    }
}

module.exports = new ProductController();