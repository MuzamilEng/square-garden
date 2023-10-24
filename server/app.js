const express = require('express');
const app = express();
const multer = require('multer');
require('dotenv').config({ path: '.env' })
const connectDB = require('./db/connect');
const errorHandler = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')
const home = require('./routes/Home');
// const auth = require('./routes/auth');
const path = require('path')
const cors = require('cors')
const gardenSchema = require('./models/gardenSchema');
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
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 10 * 1024 * 1024, // Increase field size limit to 10MB (adjust as needed)
  }
});const uploadFiles = upload.fields([{ name: 'headerImage', maxCount: 1 }, { name: 'mainImages', maxCount: 4 }, { name: 'mainImage1', maxCount: 1 }, { name: 'mainImage2', maxCount: 1 }, { name: 'mainImage3', maxCount: 1 }, { name: 'mainImage4', maxCount: 1 }, { name: 'footerLogoImage', maxCount: 1 }])

const port = process.env.PORT;
// middleware
app.use(cors())
app.use(express.static(__dirname + "public"));
app.use(express.json())
// routes

app.use('/api/v1/home', home)
// app.use('/api/v1/auth', auth)

app.post('/api/v1/home', uploadFiles, async (req, res, next) => {
  const {
    headerTitle, headerText, rentRoom, privateRoom, mainDescription, mainLocation,
    mainCommunity, mainPara, bannerText, bannerButton, sectionTitle, sectionText,
    footerDescription, footerText, footerLinks
  } = req.body;

  let headerImageURL, footerLogoImageURL, mainImage1URL, mainImage2URL, mainImage3URL, mainImage4URL;
  // const mainImages = [];

  if (req.files['headerImage']) {
    const headerImage = req.files['headerImage'][0];
    const headerResult = await cloudinary.uploader.upload(headerImage.path, {
      folder: 'Assets',
    });
    headerImageURL = headerResult.secure_url;
  }
  if (req.files['mainImage1']) {
    const mainImage1 = req.files['mainImage1'][0];
    const mainImage1Result = await cloudinary.uploader.upload(mainImage1.path, {
      folder: 'Assets',
    });
    mainImage1URL = mainImage1Result.secure_url;
  }
  if (req.files['mainImage2']) {
    const mainImage2 = req.files['mainImage2'][0];
    const mainImage2Result = await cloudinary.uploader.upload(mainImage2.path, {
      folder: 'Assets',
    });
    mainImage2URL = mainImage2Result.secure_url;
  }
  if (req.files['mainImage3']) {
    const mainImage3 = req.files['mainImage3'][0];
    const mainImage3Result = await cloudinary.uploader.upload(mainImage3.path, {
      folder: 'Assets',
    });
    mainImage3URL = mainImage3Result.secure_url;
  } if (req.files['mainImage3']) {
    const mainImage4 = req.files['mainImage4'][0];
    const mainImage4Result = await cloudinary.uploader.upload(mainImage4.path, {
      folder: 'Assets',
    });
    mainImage4URL = mainImage4Result.secure_url;
  }


  if (req.files['footerLogoImage']) {
    const footerLogoImage = req.files['footerLogoImage'][0];
    const footerResult = await cloudinary.uploader.upload(footerLogoImage.path, {
      folder: 'Assets',
    });
    footerLogoImageURL = footerResult.secure_url;
  }

  const newContent = new gardenSchema({
    headerTitle: headerTitle, headerImage: headerImageURL, headerText: headerText, rentRoom: rentRoom, privateRoom: privateRoom,
    mainImage1: mainImage1URL, mainImage2: mainImage2URL, mainImage3: mainImage3URL, mainImage4: mainImage4URL,
    mainDescription: mainDescription, mainLocation: mainLocation, mainCommunity: mainCommunity,
    mainPara: mainPara, bannerText: bannerText, bannerButton: bannerButton, sectionTitle: sectionTitle, sectionText: sectionText,
    footerLogoImage: footerLogoImageURL,
    footerDescription: footerDescription, footerText: footerText, footerLinks: footerLinks
  });

  try {
    const savedContent = await newContent.save();

    // Construct the response object with all fields
    const responseObj = {
      ...savedContent._doc, // Include all fields from the savedContent object
    };

    // Include headerImage, mainImages and footerLogoImage URLs in the response
    if (headerImageURL) {
      responseObj.headerImage = headerImageURL;
    }
    if (mainImage1URL) {
      responseObj.mainImage1 = mainImage1URL;
    }
    if (mainImage2URL) {
      responseObj.mainImage2 = mainImage2URL;
    }
    if (mainImage3URL) {
      responseObj.mainImage3 = mainImage3URL;
    }
    if (mainImage4URL) {
      responseObj.mainImage4 = mainImage4URL;
    }

    if (footerLogoImageURL) {
      responseObj.footerLogoImage = footerLogoImageURL;
    }

    // console.log('savedContent', responseObj);
    res.status(201).json(responseObj);
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({ message: 'Error saving product' });
  }
});





app.put('/api/v1/edit-home/:id', uploadFiles, async (req, res, next) => {
  const {
    headerTitle, headerText, rentRoom, privateRoom, mainDescription, mainLocation,
    mainCommunity, mainPara, bannerText, bannerButton, sectionTitle, sectionText,
    footerDescription, footerText, footerLinks
  } = req.body;
  // console.log(req.body, "request");

  const updateFields = {
    headerTitle, headerText, rentRoom, privateRoom, mainDescription, mainLocation,
    mainCommunity, mainPara, bannerText, bannerButton, sectionTitle, sectionText,
    footerDescription, footerText, footerLinks
  };

  try {
    const existingContent = await gardenSchema.findById(req.params.id);

    if (!existingContent) {
      return res.status(404).json({ message: 'Content not found' });
    }

    // Handle image updates
    if (req.files['headerImage']) {
      // Delete previous header image if it exists
      if (existingContent.headerImage) {
        await cloudinary.uploader.destroy(existingContent.headerImage.replace(cloudinary.config().cloud_name + '/', ''));
      }

      const headerImage = req.files['headerImage'][0];
      const headerResult = await cloudinary.uploader.upload(headerImage.path, {
        folder: 'Assets',
      });
      updateFields.headerImage = headerResult.secure_url;
    }

    if (req.files['mainImage1']) {
      // Delete previous mainImage1 if it exists
      if (existingContent.mainImage1) {
        await cloudinary.uploader.destroy(existingContent.mainImage1.replace(cloudinary.config().cloud_name + '/', ''));
      }

      const mainImage1 = req.files['mainImage1'][0];
      const mainImage1Result = await cloudinary.uploader.upload(mainImage1.path, {
        folder: 'Assets',
      });
      updateFields.mainImage1 = mainImage1Result.secure_url;
    }
    if (req.files['mainImage2']) {
      // Delete previous mainImage2 if it exists
      if (existingContent.mainImage2) {
        await cloudinary.uploader.destroy(existingContent.mainImage2.replace(cloudinary.config().cloud_name + '/', ''));
      }

      const mainImage2 = req.files['mainImage2'][0];
      const mainImage2Result = await cloudinary.uploader.upload(mainImage2.path, {
        folder: 'Assets',
      });
      updateFields.mainImage2 = mainImage2Result.secure_url;
    }

    if (req.files['mainImage3']) {
      // Delete previous mainImage3 if it exists
      if (existingContent.mainImage3) {
        await cloudinary.uploader.destroy(existingContent.mainImage3.replace(cloudinary.config().cloud_name + '/', ''));
      }

      const mainImage3 = req.files['mainImage3'][0];
      const mainImage3Result = await cloudinary.uploader.upload(mainImage3.path, {
        folder: 'Assets',
      });
      updateFields.mainImage3 = mainImage3Result.secure_url;
    }

    if (req.files['mainImage4']) {
      // Delete previous mainImage4 if it exists
      if (existingContent.mainImage4) {
        await cloudinary.uploader.destroy(existingContent.mainImage4.replace(cloudinary.config().cloud_name + '/', ''));
      }

      const mainImage4 = req.files['mainImage4'][0];
      const mainImage4Result = await cloudinary.uploader.upload(mainImage4.path, {
        folder: 'Assets',
      });
      updateFields.mainImage4 = mainImage4Result.secure_url;
    }

    if (req.files['footerLogoImage']) {
      // Delete previous footerLogoImage if it exists
      if (existingContent.footerLogoImage) {
        await cloudinary.uploader.destroy(existingContent.footerLogoImage.replace(cloudinary.config().cloud_name + '/', ''));
      }

      const footerLogoImage = req.files['footerLogoImage'][0];
      const footerImageResult = await cloudinary.uploader.upload(footerLogoImage.path, {
        folder: 'Assets',
      });
      updateFields.footerLogoImage = footerImageResult.secure_url;
    }
    // Handle image updates for other image fields (mainImage2, mainImage3, mainImage4, footerLogoImage)

    // Update the database record with the new data
    // console.log(updateFields, "updateFields");
    const updatedContent = await gardenSchema.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedContent) {
      return res.status(500).json({ message: 'Failed to update content' });
    }

    res.status(200).json(updatedContent);
  } catch (error) {
    console.error('Error updating product:', error);
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