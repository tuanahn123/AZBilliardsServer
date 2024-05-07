const express = require('express')

const asyncHandle = require('../helpers/asyncHandler')
const ToolController = require('../controller/tool.controller')
const { checkRole, checkLogin } = require('../middleware/checkLogin')
const router = express.Router()

router.get('/:id', asyncHandle(ToolController.getById))
router.use(checkRole)
router.post('/', asyncHandle(ToolController.create))
router.post('/:id', asyncHandle(ToolController.update))
router.delete('/:id', asyncHandle(ToolController.delete))
module.exports = router