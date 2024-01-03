const CollectionModel = require("../models/Collection.model");

// Find A Collection is Exist ?
exports.checkACollectionExits = async (collection) => {
    const FindCollection = await CollectionModel.findOne({ collection: collection });
    return FindCollection;
}

// Find All Collection
exports.getAllCollectionService = async () => {
    const getAllCollectionData = await CollectionModel.find({});
    return getAllCollectionData;
}

// Add A Collection
exports.postCollectionServices = async (data) => {
    const createCollection = await CollectionModel.create(data);
    return createCollection;
}

// Update a Collection
exports.updateCollectionServices = async(data) =>{
    const updateCollectionInfo = await CollectionModel.findOne({_id: data?._id})
    const Collection = await CollectionModel.updateOne(updateCollectionInfo, data, {
    runValidators: true });
    return Collection;
}

// Delete a Collection
exports.deleteCollectionServices = async (id) => {
    const Collection = await CollectionModel.deleteOne({ _id: id }, {
        runValidators: true
    });
    return Collection;
};
