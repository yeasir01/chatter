import cloudinary from "../config/cloudinary.mjs"

const uploadToCloudinary = (fileBuffer, folder, fileName) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: folder, public_id: fileName, resource_type: 'auto' }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                // `result` contains the URL of the uploaded image
                const assetURL = result.secure_url;
                resolve(assetURL);
            }
        }).end(fileBuffer);
    });
 };

 export default uploadToCloudinary;