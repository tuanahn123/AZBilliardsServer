const asyncHandle = require("../helpers/asyncHandler");
const { AuthFailureError } = require("../responseHandle/error.response");

const checkLogin = asyncHandle(async (req, res, next) => {
    
    if (req.session.login) {
        next()
    } else {
        throw new AuthFailureError("Bạn chưa đăng nhập !");
    }
})
const checkRole = asyncHandle(async (req, res, next) => {
    
    if (req.session.role == "0") {
        next()
    } else {
        throw new AuthFailureError("Bạn không có quyền để thực hiện !");
    }
})
module.exports = {
    checkLogin,
    checkRole
}