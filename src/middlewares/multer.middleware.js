import multer from 'multer';
import { v4 as uuidv4 } from 'uuid'; // Importing UUID package for generating unique filenames
import { fileURLToPath } from 'url';
import path from 'path';

// Get the directory name of the current module file
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../public/temp');
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuidv4(); // Generating a unique identifier
    cb(null, file.originalname + '-' + uniqueSuffix);
  }
});

export const upload = multer({ storage });
