const CollectionModel = require("../models/Collection.model");
const ProductModel = require("../models/Product.model");

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

// Find A Collection is Exist when update ?
exports.checkACollectionExitsInCollectionWhenUpdate = async (collection_name) => {
    const findCollection = await CollectionModel.findOne({ collection_name: collection_name }); 
    return findCollection;
}

// Update a Collection
exports.updateCollectionServices = async(data) =>{
    const updateCollectionInfo = await CollectionModel.findOne({_id: data?._id})
    const Collection = await CollectionModel.updateOne(updateCollectionInfo, data, {
    runValidators: true });
    return Collection;
}

// Find A Collection is Exist in products ?
exports.checkACollectionExitsInProducts = async (id) => {
    const FindCollection = await ProductModel.find({ collectionId: id });
    return FindCollection;
}

// Delete a Collection
exports.deleteCollectionServices = async (id) => {
    const Collection = await CollectionModel.deleteOne({ _id: id }, {
        runValidators: true
    });
    return Collection;
};
