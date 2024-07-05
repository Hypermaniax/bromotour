const express = require('express');
const {OurTeam}= require('../../controller/home/team')

const router = express.Router()

router.get('/', OurTeam)

module.exports ={
    teamRoute : router
}