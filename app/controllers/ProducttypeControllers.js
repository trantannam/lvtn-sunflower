const Producttype = require('../models/ProductType');

class ProducttypeController {

    index(req, res){
        Producttype.find({}, function (err, producttype){
            if(!err){
                res.json({
                    success: true,
                    massage: 'successfully',
                    producttype
                });
            }else{
                res.status(400).json({error: 'ERROR!!!'})
            }
        });
    }
}

module.exports = new ProducttypeController();