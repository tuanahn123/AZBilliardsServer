const { SuccessResponse } = require("../responseHandle/success.response")
const ToolService = require("../services/tool.service")
class ToolController {
    static getAll = async(req, res, next)=>{
        new SuccessResponse({
            message:'Lấy danh sách dụng cụ thành công!',
            metadata: await ToolService.getAll()
        }).send(res)
    }
    static getById = async(req, res, next)=>{
        new SuccessResponse({
            message:'Lấy thông tin dụng cụ thành công!',
            metadata: await ToolService.getById(req.params.id)
        }).send(res)
    }
    static create = async(req, res, next)=>{
        new SuccessResponse({
            message:'Tạo mới dụng cụ thành công!',
            metadata: await ToolService.create(req.body)
        }).send(res)
    }
    static update = async(req, res, next)=>{
        new SuccessResponse({
            message:'Cập nhật dụng cụ thành công!',
            metadata: await ToolService.update(req.params.id,req.body)
        }).send(res)
    }
    static delete = async(req, res, next)=>{
        new SuccessResponse({
            message:'Xóa dụng cụ thành công!',
            metadata: await ToolService.delete(req.params.id)
        }).send(res)
    }
}

module.exports = ToolController