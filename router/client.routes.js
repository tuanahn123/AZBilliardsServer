const express = require('express')

const router = express.Router()

router.use('/signin_login', (req, res, next) => {
    res.render('signin_login')
})
router.use('/', (req, res, next) => {
    res.render('index')
})
module.exports = router