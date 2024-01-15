const express = require("express");
const { getAllCollection, postCollection, deleteACollectionInfo, updateCollectionInfo } = require("../controllers/collection.controllers");
const { CollectionImageUpload } = require("../../helpers/collection.image.upload");
const verifyToken = require("../../middleware/verify.token");
const router = express.Router();

// get post delete and update Collection Item
router.route('/').get(getAllCollection).post(verifyToken, CollectionImageUpload.fields([{ name: 'collection_image', maxCount: 1 }]), postCollection).patch(verifyToken, CollectionImageUpload.fields([{ name: 'collection_image', maxCount: 1 }]), updateCollectionInfo).delete(verifyToken, deleteACollectionInfo)

const CollectionRoutes = {
    router
};

module.exports = CollectionRoutes;