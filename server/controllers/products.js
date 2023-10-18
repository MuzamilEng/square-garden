const Products = require('../models/product');

const getProducts = async (req, res) => {
    try {
        const products = await Products.find();
        res.json(products);
        //   console.log('Products found', products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Products.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
        //   console.log('Product found', product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


  const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Products.findByIdAndUpdate(
            req.params.productId,
            req.body,
            { new: true } // Return the updated product
        );
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(updatedProduct);
        //   console.log('Product updated', updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Products.findByIdAndRemove(req.params.productId);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(deletedProduct);
        //   console.log('Product deleted', deletedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    getProductById,
    getProducts,
    updateProduct,
    deleteProduct
};
