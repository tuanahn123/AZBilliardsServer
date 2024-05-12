const express = require('express')

const asyncHandle = require('../helpers/asyncHandler')
const UserController = require('../controller/user.controller')
const { checkLogin, checkRole } = require('../middleware/checkLogin')
const router = express.Router()

router.post('/', asyncHandle(UserController.signUp))
router.use(checkLogin)
router.use(checkRole)
router.get('/', asyncHandle(UserController.getAll))
module.exports = router