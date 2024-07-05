const express = require('express')

const {userRoute} = require('./user')
const {masterRoute} = require('./master')
const {adminRoute} = require('./admin')
const {logout} = require('../../controller/dashboard/logout')

const {authUser, authAdminMaster, authAdmin } = require('../../middleware/auth')

const router = express.Router()

router.use('/user',authUser, userRoute)
router.use('/admin',authAdmin, adminRoute)
router.use('/master',authAdminMaster ,masterRoute)
router.post('/logout', logout)

module.exports = { dashboardRoute : router }

