const { SuccessResponse } = require("../responseHandle/success.response")
const DeskService = require("../services/desk.service")
class DeskController {
    static getAll = async(req, res, next)=>{
        new SuccessResponse({
            message:'Lấy danh sách bàn thành công!',
            metadata: await DeskService.getAll(req.params.id)
        }).send(res)
    }
    static getById = async(req, res, next)=>{
        new SuccessResponse({
            message:'Lấy thông tin bàn thành công!',
            metadata: await DeskService.getById(req.params.id)
        }).send(res)
    }
    static create = async(req, res, next)=>{
        new SuccessResponse({
            message:'Tạo mới bàn thành công!',
            metadata: await DeskService.create(req.body)
        }).send(res)
    }
    static update = async(req, res, next)=>{
        new SuccessResponse({
            message:'Cập nhật bàn thành công!',
            metadata: await DeskService.update(req.params.id,req.body)
        }).send(res)
    }
    static delete = async(req, res, next)=>{
        new SuccessResponse({
            message:'Xóa bàn thành công!',
            metadata: await DeskService.delete(req.params.id)
        }).send(res)
    }
}

module.exports = DeskController