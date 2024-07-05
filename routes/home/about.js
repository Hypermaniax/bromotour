const express = require('express')
const { about } = require('../../controller/home/about')

const router = express.Router()

router.get('/', about)

module.exports = { aboutForm : router }