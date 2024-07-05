const express = require('express')
const controller = require('../../controller/dashboard/admin')
const { create } = require('../../controller/packages/packages');
const { uploadMiddleware } = require('../../middleware/multer')
const router = express.Router()


router.get('/', controller.dashboardAdmin)
router.post('/create',uploadMiddleware.single('foto') , create)
module.exports = { adminRoute: router }