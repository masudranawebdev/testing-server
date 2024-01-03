const express = require("express");
const { getAllCollection, postCollection, updateCollectionInfo, deleteACollectionInfo } = require("../controllers/collection.controllers");
const router = express.Router();

// get post delete and update Collection Item
router.route('/').get(getAllCollection).post(postCollection).patch(updateCollectionInfo).delete(deleteACollectionInfo)

const CollectionRoutes = {
    router
};

module.exports = CollectionRoutes;