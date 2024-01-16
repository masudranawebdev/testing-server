const express = require("express");
const { getAllCollection, postCollection, deleteACollectionInfo, updateCollectionInfo } = require("../controllers/collection.controllers");
const verifyToken = require("../../middleware/verify.token");
const { FileUploadHelper } = require("../../helpers/image.upload");
const router = express.Router();

// get post delete and update Collection Item
router.route('/').get(getAllCollection).post(verifyToken, FileUploadHelper.ImageUpload.fields([{ name: 'collection_image', maxCount: 1 }]), postCollection).patch(verifyToken, FileUploadHelper.ImageUpload.fields([{ name: 'collection_image', maxCount: 1 }]), updateCollectionInfo).delete(verifyToken, deleteACollectionInfo)

const CollectionRoutes = {
    router
};

module.exports = CollectionRoutes;