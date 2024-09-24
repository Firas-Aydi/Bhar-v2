const express = require('express')
const multer = require('multer')
const GuardAuth = require('./guardAuth')
const { Add, Verify } = require('../controllers/payment.controller')
const router = express.Router()

router.post('/payment', Add)
router.post('/payment/:id', Verify)
module.exports = router
