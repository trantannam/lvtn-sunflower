const express = require('express');
const router = express.Router();

const multer = require('multer');
// const upload = multer({ dest: 'images/products/' });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './img/product/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    //reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter,
});

const productController = require('../app/controllers/ProductControllers');

router.post('/', productController.addProduct);
router.get('/', productController.index);
router.get('/:id', productController.getProductById);
router.post('/:id/update', productController.updateProduct);
router.put('/:id/update-image', upload.single('image'), productController.updateProductImage);


module.exports = router;