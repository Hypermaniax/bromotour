const express = require('express')
const controller = require('../../controller/dashboard/user')
const router = express.Router()

router.get("/", controller.userDashboardPage);

module.exports = { userRoute : router }