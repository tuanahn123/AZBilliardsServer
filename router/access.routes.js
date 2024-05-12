const express = require('express')

const asyncHandle = require('../helpers/asyncHandler')
const AuthController = require('../controller/auth.controller')
const router = express.Router()

router.post('/login', asyncHandle(AuthController.login))
module.exports = router