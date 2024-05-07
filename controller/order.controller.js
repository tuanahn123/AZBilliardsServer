const { SuccessResponse } = require("../responseHandle/success.response")
const OrderService = require("../services/order.service")
class OrderController {
    static orderMembership = async (req, res, next) => {
        new SuccessResponse({
            message: 'Đăng ký hội viên thành công!',
            metadata: await OrderService.orderMembership(req.session.userId, req.body)
        }).send(res)
    }
    static getListOrderMembership = async (req, res, next) => {
        new SuccessResponse({
            message: 'Lấy danh sách hội viên thành công!',
            metadata: await OrderService.getListOrderMembership()
        }).send(res)
    }
    static acceptOrderMembership = async (req, res, next) => {
        new SuccessResponse({
            message: 'Xác nhận hội viên thành công!',
            metadata: await OrderService.acceptOrderMembership(req.param.id)
        }).send(res)
    }
    static orderTable = async (req, res, next) => {
        new SuccessResponse({
            message: 'Đặt bàn thành công!',
            metadata: await OrderService.orderTable(req.session.userId, req.body)
        }).send(res)
    }
}

module.exports = OrderController