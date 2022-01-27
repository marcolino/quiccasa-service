const Datauri = require("datauri");
const path = require("path");
const cloudinary = require("../config/cloudinary");

module.exports = (req) => {
  return new Promise((resolve, reject) => {
    const dataUri = new Datauri();
    let image = dataUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
    cloudinary.uploader.upload(image.content, (err, url) => {
      if (err) return reject(err);
      return resolve(url);
    })
  });
};
