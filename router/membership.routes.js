const express = require('express')

const asyncHandle = require('../helpers/asyncHandler')
const MembershipController = require('../controller/membership.controller')
const { checkRole, checkLogin } = require('../middleware/checkLogin')
const router = express.Router()

router.get('/', asyncHandle(MembershipController.getAll))
router.get('/:id', asyncHandle(MembershipController.getById))
router.use(checkLogin)
router.use(checkRole)
router.post('/', asyncHandle(MembershipController.create))
router.post('/:id', asyncHandle(MembershipController.update))
router.delete('/:id', asyncHandle(MembershipController.delete))
module.exports = router