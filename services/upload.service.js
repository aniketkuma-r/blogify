const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads"));
  },
  filename: function (req, file, cb) {
    const path = `${Date.now()}-${file.originalname}`;
    cb(null, path);
  },
});
const upload = multer({ storage });

module.exports = upload;
