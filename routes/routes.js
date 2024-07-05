const express = require('express');
const rootRoutes = express.Router()

const {homeRoute} = require('./home/home')
const {loginRoute} = require('./login & register/login_register')
const {dashboardRoute} = require('./dashboard/dashboard')
const {isAuthenticated} = require('../middleware/auth')

// home
rootRoutes.use('/',homeRoute)
// login and register
rootRoutes.use('/login',loginRoute)
// user dashboard
rootRoutes.use('/dashboard',dashboardRoute)


module.exports ={
    rootRoutes
}