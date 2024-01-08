const mongoose = require("mongoose");

// Collection Schema and connect DB collection
const collectionSchema = new mongoose.Schema({
    collection_name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

const CollectionModel = mongoose.model("collections", collectionSchema);

module.exports = CollectionModel;