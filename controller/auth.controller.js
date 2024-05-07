const { SuccessResponse } = require("../responseHandle/success.response")
const AuthService = require("../services/auth.service")


class AuthController {
    static login = async (req, res, next) => {
        const foundUser = await AuthService.login(req.body.username, req.body.password)
        req.session.regenerate(async function (err) {
            if (err) {
                throw new InternalServerError()
            }
            req.session.login = true;
            req.session.userId = foundUser.id
            req.session.role = foundUser.role
            res.cookie('role', foundUser.role, { maxAge: 60 * 60 * 1000 })
            res.cookie('fullname', foundUser.fullname, { maxAge: 60 * 60 * 1000 })
            res.cookie('username', foundUser.username, { maxAge: 60 * 60 * 1000 })
            res.cookie('userId', foundUser.id)
            new SuccessResponse({
                message: 'Đăng nhập thành công!',
                metadata: foundUser
            }).send(res)
        });

    }
}

module.exports = AuthController