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
            metadata: await OrderService.acceptOrderMembership(req.params.id)
        }).send(res)
    }
    static orderDesk = async (req, res, next) => {
        new SuccessResponse({
            message: 'Đặt bàn thành công!',
            metadata: await OrderService.orderDesk(req.session.userId, req.body)
        }).send(res)
    }
    static getAllOrderDesk = async (req, res, next) => {
        new SuccessResponse({
            message: 'Lấy danh sách thành công!',
            metadata: await OrderService.getAllOrderDesk()
        }).send(res)
    }
}

module.exports = OrderController