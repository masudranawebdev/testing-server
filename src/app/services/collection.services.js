const CollectionModel = require("../models/Collection.model");

// Find A Collection is Exist ?
exports.checkACollectionExits = async (collection_name) => {
    const FindCollection = await CollectionModel.findOne({ collection_name: collection_name });
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

// Delete a Collection
exports.deleteCollectionServices = async (id) => {
    const Collection = await CollectionModel.deleteOne({ _id: id }, {
        runValidators: true
    });
    return Collection;
};
