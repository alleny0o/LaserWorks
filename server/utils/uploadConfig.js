import multer from "multer";
import path from "path";

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

// Define file filter to allow only specific types of files
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|webp|mp4|webm|ogg/;
  const mimetypes = /image\/(jpeg|jpg|png|gif|webp)|video\/(mp4|webm|ogg)/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only images and videos are allowed."),
      false
    );
  }
};

// Create multer upload instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

export default upload;
