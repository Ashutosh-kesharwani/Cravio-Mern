import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, path.resolve("public/temp"));
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file?.originalname;
    return cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
});

export default upload;
