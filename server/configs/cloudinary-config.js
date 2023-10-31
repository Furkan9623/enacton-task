const cloudinary = require("cloudinary").v2;
const { error } = require("console");
const fs = require("fs");
require("dotenv").config();
const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

const uploadImages = async (file, foldername) => {
  fs.rm("tmp", { recursive: true }, (er) => {
    if (er) return console.log("er found while del temp file", er);
  });
  console.log("temp file delte");
  if (!file?.mimetype.startsWith("image")) {
    throw new Error("Image format not correct");
  }

  try {
    const result = await cloudinary.uploader.upload(file?.tempFilePath, {
      folder: foldername,
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = uploadImages;
