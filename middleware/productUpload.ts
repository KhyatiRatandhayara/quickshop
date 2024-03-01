import { NextFunction, Request, Response } from "express";
import multer from "multer";

//NEED TO RESOLVE: if I append this middleware req.body is getting blank

// SAME ISSUE WITH productValidator middleware
// NOTE: multer code in same file is working

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `/${file.fieldname}-${Date.now()}.${ext}`);
    },
  });
  
  const multerFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb( new Error('Please upload a valid image file'), false)
        } else {
          cb(null, true);
        }
  };
   const uploadFile =   multer({
    storage: multerStorage,
    limits: {
      fileSize: 3 * 1024 * 1024, //max 3MB file upload, if it exceeds the limit it will throw the multer error, needs to handlw that
    },
    fileFilter: multerFilter,
  });

export const productImageUpload =  (req: Request, res: Response, next: NextFunction) => {
    uploadFile.single('productImage')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // Handle MulterError
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ message: 'File too large. Max file size is 3MB.' });
            }
            // Handle other MulterError codes if needed
            return res.status(400).json({ message: 'Multer error: ' + err.message });
        } else if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    });
     next();
}