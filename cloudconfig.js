// Require the Cloudinary library
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// configure cloudinary to connect backend with cloud
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, // 🔑 match env variable names
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// configure multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "StayNGo", // folder name in Cloudinary
    allowed_formats: ["jpeg", "png", "jpg"],
  },
});

module.exports = {
  cloudinary,
  storage,
};
