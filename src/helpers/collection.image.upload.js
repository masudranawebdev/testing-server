// upload a image
const multer = require('multer');
const path = require('path');

// save file in upload folder
const storage = multer.diskStorage({
    destination: "collection.images/",
    filename: function (req, file, cb) {
    const uniqueIdentifier = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = uniqueIdentifier + path.extname(file.originalname);
    cb(null, filename);
  },
});

exports.CollectionImageUpload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const supportedImage = /png|jpg|webp|jpeg|PNG|JPG|WEBP|JPEG/;
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