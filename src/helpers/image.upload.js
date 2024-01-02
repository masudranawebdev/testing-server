// upload a image
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import * as fs from 'fs';
const path = require("path");


cloudinary.config({
    cloud_name: 'dlk2qccww',
    api_key: '912873474116267',
    api_secret: 'SYCvs92Y6zdt6YYll_o3FH8Agkw'
});

// save file in upload folder
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const ImageUpload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const supportedImage = /png|jpg|webp|jpeg/;
        const extension = path.extname(file.originalname);

        if (supportedImage.test(extension)) {
            cb(null, true);
        } else {
            cb(new Error("Must be a png|jpg|webp|jpeg image"));
        }

    },
    limits: {
        fileSize: 5000000,
    }
})

// upload image in cloudinary
const uploadToCloudinary = async (file) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file.path,
            (error, result) => {
                fs.unlinkSync(file.path);
                if (error) {
                    reject(error)
                }
                else {
                    resolve(result)
                }
            })
    })
};

const FileUploadHelper = {
    uploadToCloudinary,
    ImageUpload
};

module.exports = FileUploadHelper;