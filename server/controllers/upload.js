const multer = require('multer');

// Configure where to store uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Specify your upload directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
