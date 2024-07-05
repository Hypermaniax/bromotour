const express =require('express')
const controller = require('../../controller/home/homePage')
const router = express.Router()

const {galleryForm} = require('./gallery')
const {aboutForm} = require('./about')
const {packagesForm} = require('./packages')
const {teamRoute} = require('./team')

router.get('/',controller.homepage)
router.use('/gallery',galleryForm)
router.use('/about',aboutForm)
router.use('/packages',packagesForm)
router.use('/team',teamRoute)

module.exports = { homeRoute : router }