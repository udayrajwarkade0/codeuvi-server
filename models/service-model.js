const { Schema, model } = require("mongoose");

const serviceSchema = new Schema({
  weblink: { type: String, required: true },
  description: { type: String, required: true },
  github: { type: String, required: true },
  thumbnail: { type: String, required: true } // Cloudinary/Imgur URL
});

const Service = model("Service", serviceSchema);

module.exports = Service;
