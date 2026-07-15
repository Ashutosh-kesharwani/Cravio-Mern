import multer from "multer";
import path from "path";
// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    return callback(null, path.resolve("public/temp"));
  },
  filename: (req, file, callback) => {
    const uniqueFileName = Date.now() + "-" + file?.originalname;
    return callback(null, uniqueFileName);
  },
});

const upload = multer({
  storage,
});

export default upload;
