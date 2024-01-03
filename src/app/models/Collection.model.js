const mongoose = require("mongoose");

// Collection Schema and connect DB collection
const collectionSchema = new mongoose.Schema({
    collection: {
        type: String,
        required: true,
    },
},
{
    timestamps: true
})

const CollectionModel = mongoose.model("collections", collectionSchema);

module.exports = CollectionModel;