const express = require("express");
const { getAllCollection, postCollection, deleteACollectionInfo, updateCollectionInfo } = require("../controllers/collection.controllers");
const { CollectionImageUpload } = require("../../helpers/collection.image.upload");
const router = express.Router();

// get post delete and update Collection Item
router.route('/').get(getAllCollection).post(CollectionImageUpload.fields([{ name: 'collection_image', maxCount: 1 }]), postCollection).patch(CollectionImageUpload.fields([{ name: 'collection_image', maxCount: 1 }]), updateCollectionInfo).delete(deleteACollectionInfo)

const CollectionRoutes = {
    router
};

module.exports = CollectionRoutes;