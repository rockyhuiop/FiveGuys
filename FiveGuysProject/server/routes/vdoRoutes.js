const express = require('express')
const {vdoController} = require('../controllers/vdoController');

const router = express.Router()

router.post('/upload', vdoController)

module.exports = router