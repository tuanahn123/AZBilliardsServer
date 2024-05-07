const express = require('express')

const asyncHandle = require('../helpers/asyncHandler')
const DeskController = require('../controller/desk.controller')
const { checkRole, checkLogin } = require('../middleware/checkLogin')
const router = express.Router()


router.get('/:id', asyncHandle(DeskController.getById))
router.get('/', asyncHandle(DeskController.getAll))
router.use(checkRole)
router.post('/', asyncHandle(DeskController.create))
router.post('/:id', asyncHandle(DeskController.update))
router.delete('/:id', asyncHandle(DeskController.delete))
module.exports = router