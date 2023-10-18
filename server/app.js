const express = require('express');
const app = express();
const multer = require('multer');
require('dotenv').config( { path: '.env'})
const connectDB =  require('./db/connect');
const errorHandler = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')
const products = require('./routes/products');
const auth = require('./routes/auth');
const path = require('path')
const cors = require('cors')
const Products = require('./models/product');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'njnjj2fdiawje',
    api_key: '186277285738544',
    api_secret: 'IKoKc-pKt9XF8dNdJbE3TeA9WyM',
});


const storage = multer.diskStorage({
    destination: ('./public/uploads/'),
    filename: (req, file, cb) => {
      cb(null, file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage: storage }).single('image')

const port = process.env.PORT;
// middleware
app.use(cors())
app.use(express.static(__dirname+"public"));
app.use(express.json())
// routes

app.use('/api/v1/products', products)
app.use('/api/v1/auth', auth)

app.post('/api/v1/products', upload, async (req, res, next) => {
  try {
    const { title, description, more } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'Assets', // Optional: Specify the folder in Cloudinary
    });

    const newProduct = new Products({
      title,
      description,
      image: result.secure_url, // Use the secure URL from Cloudinary
      more,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.log(error, 'Error saving');
    res.status(500).json({ message: 'Error saving product' });
  }
});

app.put('/api/v1/update/:id', upload, async (req, res, next) => {
  const productId = req.params.id;

  try {
    const product = await Products.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (req.file) {
      // Delete the previous image from Cloudinary
      if (product.image) {
        const publicId = product.image.substring(product.image.lastIndexOf('/') + 1).split('.')[0];
        await cloudinary.uploader.destroy(publicId);
        // Upload the new image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'Assets', // Optional: Specify the folder in Cloudinary
        });
        product.image = result.secure_url;
      }
    }

    // Update other product properties if provided in the request
    if (req.body.title) {
      product.title = req.body.title;
    }

    if (req.body.description) {
      product.description = req.body.description;
    }

    if (req.body.more) {
      product.more = req.body.more;
    }

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error, 'Error updating product');
    res.status(500).json({ message: 'Error updating product' });
  }
});






app.use(errorHandler)
app.use(notFound)

const start = async () => {
    try {
      await connectDB(process.env.URI);
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    } 
  };
  
  start(); 