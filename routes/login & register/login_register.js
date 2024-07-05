const express = require('express')
const controller = require('../../controller/login & register/login_register')
const router = express.Router()

router.get('/', controller.loginPage)
router.post('/auth', controller.loginSubmit)
router.post('/register', controller.registerSubmit)

module.exports = { loginRoute : router }