const express = require('express');
const controller = require('../../controller/home/packages');
const router = express.Router()

router.get('/', controller.getPackages)

module.exports = { packagesForm: router }