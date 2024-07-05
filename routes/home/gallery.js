const express = require('express')
const controller = require('../../controller/home/gallery')
const router = express.Router()

router.get('/', controller.gallery)

module.exports = { galleryForm : router }