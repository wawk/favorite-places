const multer = require("multer");
const uuid = require("uuid/v1");
const MIME_TYPEMAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};

const fileUpload = multer({
  limit: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPEMAP[file.mimetype];
      cb(null, uuid() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPEMAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid MimeType!");
    cb(error, isValid);
  },
});

module.exports = fileUpload;
