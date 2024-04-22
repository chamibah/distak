import multer from 'multer';
import path from 'path';

export const uploadMultply = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    }),
   
}).single('image');