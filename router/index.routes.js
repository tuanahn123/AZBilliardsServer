const express = require('express')

const { checkLogin } = require('../middleware/checkLogin')
const router = express.Router()

router.use('/api', require('./access.routes'))
router.use('/api/user', require('./user.routes'))
router.use('/api/tool', require('./tool.routes'))
router.use('/api/desk', require('./desk.routes'))
router.use('/api/order', require('./order.routes'))
router.use('/api/membership', require('./membership.routes'))
router.use('/', require('./client.routes'))

module.exports = router