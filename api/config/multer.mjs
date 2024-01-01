import multer from "multer";

const storage = multer.memoryStorage();

const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

const fileFilter = (_req, file, callback) => {
   if (imageMimeTypes.includes(file.mimetype)) {
       return callback(null, true);
   }
   return callback(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.'));
};

const upload = multer({
   storage: storage,
   limits: {
       fileSize: 2 * 1024 * 1024, // 2MB limit
   },
   fileFilter: fileFilter,
});

export default upload;