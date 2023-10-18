const express = require('express')
const router = express.Router();

const {
    getProductById, getProducts, updateProduct, deleteProduct, addProduct,
} = require('../controllers/products')

router.route('/').get(getProducts);
router.route('/:productId').get(getProductById).put(updateProduct).delete(deleteProduct);

module.exports = router