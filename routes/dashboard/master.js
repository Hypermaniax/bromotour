const express = require('express')
const controller = require('../../controller/dashboard/master')
const router = express.Router()

router.get('/',controller.dashboardMaster)
router.post('/add', controller.adminRegister)

module.exports = { masterRoute : router }