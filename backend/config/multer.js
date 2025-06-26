const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "profile") {
      // Folder where you want to store uploaded files
      const uploadFolder = "uploads/profile-pictures";
      if (!fs.existsSync(uploadFolder)) {
        fs.mkdirSync(uploadFolder, { recursive: true });
      }
      cb(null, uploadFolder);
    }

    if (file.fieldname === "thumbnail") {
      // Folder where you want to store uploaded files
      const uploadFolder = "uploads/event";
      if (!fs.existsSync(uploadFolder)) {
        fs.mkdirSync(uploadFolder, { recursive: true });
      }
      cb(null, uploadFolder);
    }
  },
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + "-" + file.fieldname + ext);
  },
});

function profileFiter(req, file, cb) {
  let ext = path.extname(file.originalname);
  if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
    return cb(new Error("File Format Not Supported"));
  }
  cb(null, true);
}

module.exports = { storage, profileFiter };
