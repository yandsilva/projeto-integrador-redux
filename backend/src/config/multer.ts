import multer, { Options } from "multer";
import path from "path";

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, "..", "uploads"),
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 8, // 5MB
  },
  fileFilter: (req, file, cb) => {
    const mimeType = ["image/png", "image/jpeg", "image/gif", "image/jpg"];

    if (!mimeType.includes(file.mimetype)) {
      return cb(null, false);
    }
    cb(null, true);
  },
} as Options;
