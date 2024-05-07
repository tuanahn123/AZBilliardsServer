const { SuccessResponse } = require("../responseHandle/success.response")
const MembershipService = require("../services/membership.service")
class MembershipController {
    static getAll = async(req, res, next)=>{
        new SuccessResponse({
            message:'Lấy danh sách hội viên thành công!',
            metadata: await MembershipService.getAll(req.params.id)
        }).send(res)
    }
    static create = async(req, res, next)=>{
        new SuccessResponse({
            message:'Tạo mới thông tin hội viên thành công!',
            metadata: await MembershipService.create(req.body)
        }).send(res)
    }
    static update = async(req, res, next)=>{
        new SuccessResponse({
            message:'Cập nhật thông tin hội viên thành công!',
            metadata: await MembershipService.update(req.params.id,req.body)
        }).send(res)
    }
    static delete = async(req, res, next)=>{
        new SuccessResponse({
            message:'Xóa thông tin hội viên thành công!',
            metadata: await MembershipService.delete(req.params.id)
        }).send(res)
    }
}

module.exports = MembershipController