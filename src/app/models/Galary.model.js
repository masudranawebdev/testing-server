const mongoose = require("mongoose");

// Galary Schema and connect DB Galary
const gallerySchema = new mongoose.Schema({
    thumbnail_image: {
        type: String,
        required: true
    },
    hover_image: {
        type: String,
        required: true
    },
    galary: [
        {
            image: String
        }
    ],
},
{
    timestamps: true
})

const GalleryModel = mongoose.model("galleries", gallerySchema);

module.exports = GalleryModel;