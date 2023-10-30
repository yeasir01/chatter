import upload from "../config/multer.js";
import multer from "multer";
import ValidationError from "../errors/ValidationError.js";

const handleFileUpload = (req, res, next) => {
    upload.single("file")(req, res, (err) => {
        
        if (err instanceof multer.MulterError) {
            const valError = new ValidationError(
                "File size exceeds the 2MB limit.",
                "file",
            );

            return next(valError);
        } else if (err) {
            return next(new Error(err.message));
        }

        // Continue to the next middleware or route if the file is valid
        next();
    });
};

export default handleFileUpload;
