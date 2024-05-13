const db = require("../dbs/initDb")
const { BadRequestError } = require("../responseHandle/error.response");
const moment = require("moment-timezone")
class OrderService {
    static getAllOrderDesk = async () => {
        const query = `
        SELECT 
        OrderDesk.*,
        Desk.id AS desk_id, 
        Desk.name AS desk_name,
        Tool.id AS tool_id,
        Tool.name AS tool_name,
        User.id AS user_id,
        User.fullname AS fullname
    FROM 
        OrderDesk
    INNER JOIN 
        Desk ON OrderDesk.desk_id = Desk.id
    INNER JOIN 
        Tool ON OrderDesk.tool_id = Tool.id
    INNER JOIN 
        User ON OrderDesk.user_id = User.id;
    ;
    `;
        const checkResults = await new Promise((resolve, reject) => {
            db.query(query, (checkError, results) => {
                if (checkError) {
                    reject(new BadRequestError(checkError.message));
                    return;
                }
                resolve(results);
            });
        });
        // Chuyển đổi kết quả thành mảng các đối tượng
        const formattedResults = checkResults.map(row => ({
            id: row.id,
            desk: {
                id: row.desk_id,
                name: row.desk_name,
            },
            tool: {
                id: row.tool_id,
                name: row.tool_name,
            },
            start_date: row.start_date,
            end_date: row.end_date,
            combo: row.combo,
            quantity_tool: row.quantity_tool,
            price: row.price,
            user: {
                id: row.user_id,
                fullname: row.fullname,
            }
        }));

        return formattedResults

    }
    static orderDesk = async (user_id, { desk_id, tool_id, start_date, end_date, combo, quantity_tool }) => {
        const checkQuery = 'SELECT * FROM OrderDesk WHERE desk_id = ? AND ((start_date >= ? AND start_date < ?) OR (end_date > ? AND end_date <= ?))';
        const checkResults = await new Promise((resolve, reject) => {
            db.query(checkQuery, [desk_id, start_date, end_date, start_date, end_date], (checkError, results) => {
                if (checkError) {
                    reject(new BadRequestError(checkError.message));
                    return;
                }
                resolve(results);
            });
        });
        // Nếu bàn đã được đặt trong khoảng thời gian đó, báo lỗi
        if (checkResults.length > 0) {
            throw new BadRequestError('Bàn đã được đặt trong khoảng thời gian này.');
        }
        // Thêm mới bản ghi vào bảng OrderDesk
        const price = await this.calculatePriceOrderDesk(user_id, desk_id, tool_id, combo, quantity_tool)
        const insertQueryOrderDesk = 'INSERT INTO OrderDesk (user_id, desk_id,tool_id,start_date,end_date,combo,quantity_tool,price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const insertResultsOrderDesk = await new Promise((resolve, reject) => {
            db.query(insertQueryOrderDesk, [user_id, desk_id, tool_id, start_date, end_date, combo, quantity_tool, price], (insertError, results) => {
                if (insertError) {
                    reject(new BadRequestError(insertError.message));
                    return;
                }
                resolve(results);
            });
        });
        return insertResultsOrderDesk;
    }
    static async calculatePriceOrderDesk(user_id, desk_id, tool_id, combo, quantity_tool) {
        // Lấy thông tin giá và tỷ lệ giảm giá từ bảng Desk
        const queryTable = 'SELECT price, discount_rate FROM Desk WHERE id = ?';

        const resultQueryTable = await new Promise((resolve, reject) => {
            db.query(queryTable, [desk_id], (checkError, results) => {
                if (checkError) {
                    reject(new BadRequestError(checkError.message));
                    return;
                }
                resolve(results);
            });
        });
        const { price, discount_rate } = resultQueryTable[0];
        // Tính toán giá ban đầu
        let totalPrice = price * (100 - discount_rate) / 100;

        // Nếu có combo, cập nhật giá theo combo
        if (combo && combo != null) {
            const queryComboPriceTable = `SELECT price_combo_${combo} FROM Desk WHERE id = ?`;
            const resultQueryComboPriceTable = await new Promise((resolve, reject) => {
                db.query(queryComboPriceTable, [desk_id], (checkError, results) => {
                    if (checkError) {
                        reject(new BadRequestError(checkError.message));
                        return;
                    }
                    resolve(results);
                });
            });
            totalPrice = resultQueryComboPriceTable[0][`price_combo_${parseInt(combo)}`];
        }

        // Nếu có công cụ, tính toán giá cho công cụ
        if (quantity_tool > 0 && tool_id != null) {
            const queryPriceTool = 'SELECT price FROM Tool WHERE id = ?';
            const resultQueryPriceTool = await new Promise((resolve, reject) => {
                db.query(queryPriceTool, [desk_id], (checkError, results) => {
                    if (checkError) {
                        reject(new BadRequestError(checkError.message));
                        return;
                    }
                    resolve(results);
                });
            });
            totalPrice += resultQueryPriceTool[0].price * quantity_tool;
        }

        // Kiểm tra xem người dùng có là thành viên và đang hợp lệ không
        const vietnamTimezone = 'Asia/Ho_Chi_Minh';
        const currentDate = moment.tz(new Date(), vietnamTimezone).format('YYYY-MM-DD HH:mm:ss');
        const queryOrderMembership = 'SELECT * FROM OrderMembership WHERE user_id = ? AND end_date > ? AND status = "1"';
        const resultQueryOrderMembership = await new Promise((resolve, reject) => {
            db.query(queryOrderMembership, [desk_id, currentDate], (checkError, results) => {
                if (checkError) {
                    reject(new BadRequestError(checkError.message));
                    return;
                }
                resolve(results);
            });
        });
        // Nếu là thành viên, áp dụng giảm giá thành viên
        if (resultQueryOrderMembership.length > 0) {
            const selectQuery = `
                SELECT MembershipDetail.discount_rate 
                FROM OrderMembership 
                JOIN Membership ON OrderMembership.membership_id = Membership.id 
                JOIN MembershipDetail ON Membership.membership_detail_id = MembershipDetail.id
                WHERE OrderMembership.user_id = ? AND OrderMembership.end_date > ?`;
            const resultSelectQuery = await new Promise((resolve, reject) => {
                db.query(selectQuery, [user_id, currentDate], (checkError, results) => {
                    if (checkError) {
                        reject(new BadRequestError(checkError.message));
                        return;
                    }
                    resolve(results);
                });
            });
            totalPrice *= (100 - resultSelectQuery[0].discount_rate) / 100;
        }

        return totalPrice;
    }

    static orderMembership = async (user_id, { membership_id, type }) => {
        const { start_date, end_date } = await this.getOrderTimeByType(type)
        const price = await this.getPriceByType(type, membership_id)
        // Thêm mới bản ghi vào bảng OrderMembership
        const insertQueryOrderMembership = 'INSERT INTO OrderMembership (start_date,end_date,price,user_id, membership_id,type) VALUES (?, ?,?, ?,?, ?)';
        const insertResultsOrderMembership = await new Promise((resolve, reject) => {
            db.query(insertQueryOrderMembership, [start_date, end_date, price, user_id, membership_id, type], (insertError, results) => {
                if (insertError) {
                    reject(new BadRequestError(insertError.message));
                    return;
                }
                resolve(results);
            });
        });

        return insertResultsOrderMembership;
    }
    static getPriceByType = async (type, membership_id) => {
        const ObjectTypeOfPrice = {
            0: "price_month",
            1: "price_quater",
            2: "price_year",
        }
        // Thực hiện truy vấn SELECT giá quý từ bảng Membership
        const selectQuery = `SELECT ${ObjectTypeOfPrice[type]} FROM Membership WHERE id = ?`;
        const selectResults = await new Promise((resolve, reject) => {
            db.query(selectQuery, [membership_id], (selectError, results) => {
                if (selectError) {
                    reject(new BadRequestError(selectError.message));
                    return;
                }
                resolve(results);
            });
        });
        return selectResults[0][`${ObjectTypeOfPrice[type]}`]
    }
    static getOrderTimeByType = async (type) => {
        const vietnamTimezone = 'Asia/Ho_Chi_Minh';
        const currentDate = moment.tz(vietnamTimezone);
        let start_date = currentDate.format('YYYY-MM-DD HH:mm:ss');
        let end_date;

        switch (type) {
            case '0': // Gói tháng
                end_date = currentDate.clone().add(1, 'month').format('YYYY-MM-DD HH:mm:ss');
                break;
            case '1': // Gói quý
                end_date = currentDate.clone().add(3, 'month').format('YYYY-MM-DD HH:mm:ss');
                break;
            case '2': // Gói ngày
                end_date = currentDate.clone().add(1, 'day').format('YYYY-MM-DD HH:mm:ss');
                break;
            default:
                throw new BadRequestError('Gói hội viên không hợp lệ');
        }

        return { start_date, end_date };
    }
    static async getListOrderMembership() {
        const selectQuery = `
            SELECT 
                OrderMembership.id, 
                OrderMembership.start_date, 
                OrderMembership.end_date, 
                OrderMembership.type, 
                OrderMembership.status, 
                User.username AS user_username, 
                Membership.name AS membership_name 
            FROM 
                OrderMembership 
            INNER JOIN 
                User 
            ON 
                OrderMembership.user_id = User.id 
            INNER JOIN 
                Membership 
            ON 
                OrderMembership.membership_id = Membership.id
            
        `;
        const selectResults = await new Promise((resolve, reject) => {
            db.query(selectQuery, (selectError, results) => {
                if (selectError) {
                    reject(new BadRequestError(selectError.message));
                    return;
                }
                resolve(results);
            });
        });
        return selectResults;
    }
    static async acceptOrderMembership(id) {
        const updateQuery = "UPDATE OrderMembership SET status = '0' WHERE id = ?";
        const updateResults = await new Promise((resolve, reject) => {
            db.query(updateQuery, [id], (updateError, results) => {
                if (updateError) {
                    reject(new BadRequestError(updateError.message));
                    return;
                }
                resolve(results);
            });
        });
        return updateResults;
    }
}

module.exports = OrderService