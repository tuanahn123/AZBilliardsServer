const express = require('express')

const asyncHandle = require('../helpers/asyncHandler')
const OrderController = require('../controller/order.controller')
const { checkRole, checkLogin } = require('../middleware/checkLogin')
const router = express.Router()

router.post('/membership', asyncHandle(OrderController.orderMembership))
router.get('/membership/user', asyncHandle(OrderController.getMembershipByUserId))
router.post('/desk', asyncHandle(OrderController.orderDesk))
router.use(checkLogin)
router.use(checkRole)
router.get('/membership', asyncHandle(OrderController.getListOrderMembership))
router.get('/desk', asyncHandle(OrderController.getAllOrderDesk))
router.post('/membership/accept/:id', asyncHandle(OrderController.acceptOrderMembership))

module.exports = router