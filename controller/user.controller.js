const { SuccessResponse } = require("../responseHandle/success.response")
const UserService = require("../services/user.service")


class UserController {
    static getAll = async(req, res, next)=>{
        new SuccessResponse({
            message:'Lấy danh sách user thành công!',
            metadata: await UserService.getAll()
        }).send(res)
    }
    static signUp = async(req, res, next)=>{
        new SuccessResponse({
            message:'Đăng kí thành công thành công!',
            metadata: await UserService.signUp(req.body)
        }).send(res)
    }
}

module.exports = UserController