import fs from 'fs';
import path from 'path';
import multer from 'multer';

export const UPLOAD_FOLDER = path.resolve(process.cwd(), 'src/services/covers/files/images');

if (!fs.existsSync(UPLOAD_FOLDER)) {
  fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });
}

export const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_FOLDER),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

export const upload = multer({
  storage,
  limits: { fileSize: 1000 * 512 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new multer.MulterError(), false);
  }
});