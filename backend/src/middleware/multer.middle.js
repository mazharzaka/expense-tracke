const multer = require('multer');
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require('../utils/cloudinary');
const imageSizes = {
  user: { width: 270, height: 340 },
  campaign: { width: 370, height: 225 }
};
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params:  async (req, file) => {
    const { width, height } = imageSizes[req.imageType] || { width: 300, height: 300 };

    return {
      folder: "uploads",
allowedFormats: ["jpeg", "png", "jpg",'heic','webp'],
      transformation: [{ width, height, crop: "limit" }]
    };
  }

});

const upload = multer({ storage });

module.exports = upload;

// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({ storage });

// module.exports = upload;