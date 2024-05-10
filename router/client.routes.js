const express = require('express')
const { checkRole } = require('../middleware/checkLogin')

const router = express.Router()

router.use('/signin_login', (req, res, next) => {
    res.render('signin_login')
})
router.use('/admin/tool', checkRole, (req, res, next) => {
    res.render('admin_tool')
})
router.use('/admin/tool', checkRole, (req, res, next) => {
    res.render('admin_tool')
})
router.use('/admin/membership', checkRole, (req, res, next) => {
    res.render('admin_membership')
})
router.use('/admin/desk', checkRole, (req, res, next) => {
    res.render('admin_desk')
})
router.use('/admin/order_membership', checkRole, (req, res, next) => {
    res.render('admin_order_membership')
})
router.use('/', (req, res, next) => {
    res.render('index')
})

module.exports = router