const express = require('express')
const { checkRole, checkLogin } = require('../middleware/checkLogin')

const router = express.Router()

router.use('/signin_login', (req, res, next) => {
    res.render('signin_login')
})
router.use('/giai-dau', checkLogin, (req, res, next) => {
    res.render('giaiDau')
})
router.use('/membership', checkLogin, (req, res, next) => {
    res.render('membership')
})
router.use('/membership_payment', checkLogin, (req, res, next) => {
    res.render('membership_payment')
})
router.use('/payment_complete', checkLogin, (req, res, next) => {
    res.render('membership_payment_complete')
})
router.use('/orderTable', checkLogin, (req, res, next) => {
    res.render('orderTable')
})
router.use('/dangki_giaidau', (req, res, next) => {
    res.render('dki_giaidau')
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
router.use('/admin', checkRole, (req, res, next) => {
    res.render('admin')
})
router.use('/', (req, res, next) => {
    res.render('index')
})

module.exports = router