class ProductController {

    index(req, res){
        res.send('home page');
    }

    customer(req, res){
        res.send('customer');
    }

    

}

module.exports = new ProductController();