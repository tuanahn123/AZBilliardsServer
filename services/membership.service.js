const db = require("../dbs/initDb")
const { BadRequestError } = require("../responseHandle/error.response");

class MembershipService {
    static getAll = async () => {
        const selectQuery = `
            SELECT 
                Membership.id, 
                Membership.name, 
                Membership.description, 
                Membership.price_month, 
                Membership.price_quater, 
                Membership.price_year, 
                MembershipDetail.discount_rate, 
                MembershipDetail.point_rate 
            FROM 
                Membership 
            JOIN 
                MembershipDetail 
            ON 
                Membership.membership_detail_id = MembershipDetail.id
            WHERE 
            Membership.status = "1"
        `;
        const memberships = await new Promise((resolve, reject) => {
            db.query(selectQuery, (error, results) => {
                if (error) {
                    reject(new DatabaseError(error.message));
                    return;
                }
                resolve(results);
            });
        });
        return memberships;
    }
    static getById = async (id) => {
        const selectQuery = `
            SELECT 
                Membership.id, 
                Membership.name, 
                Membership.description, 
                Membership.price_month, 
                Membership.price_quater, 
                Membership.price_year, 
                MembershipDetail.discount_rate, 
                MembershipDetail.point_rate 
            FROM 
                Membership 
            JOIN 
                MembershipDetail 
            ON 
                Membership.membership_detail_id = MembershipDetail.id
            WHERE 
            Membership.status = "1" AND Membership.id = ${id}
        `;
        const memberships = await new Promise((resolve, reject) => {
            db.query(selectQuery, (error, results) => {
                if (error) {
                    reject(new DatabaseError(error.message));
                    return;
                }
                resolve(results);
            });
        });
        return memberships;
    }

    static create = async ({ name, description, price_month, price_quater, price_year, discount_rate, point_rate }) => {
        // Thêm mới bản ghi vào bảng MembershipDetail
        const insertQueryMembershipDetail = 'INSERT INTO MembershipDetail (discount_rate, point_rate) VALUES (?, ?)';
        const insertResultsMembershipDetail = await new Promise((resolve, reject) => {
            db.query(insertQueryMembershipDetail, [discount_rate, point_rate], (insertError, results) => {
                if (insertError) {
                    reject(new BadRequestError(insertError.message));
                    return;
                }
                resolve(results);
            });
        });

        // Thêm mới bản ghi vào bảng Membership với membership_detail_id từ bước trước
        const insertQuery = 'INSERT INTO Membership (name, description, price_month, price_quater, price_year, membership_detail_id) VALUES (?, ?, ?, ?, ?, ?)';
        const insertResults = await new Promise((resolve, reject) => {
            db.query(insertQuery, [name, description, price_month, price_quater, price_year, insertResultsMembershipDetail.insertId], (insertError, results) => {
                if (insertError) {
                    reject(new BadRequestError(insertError.message));
                    return;
                }
                resolve(results);
            });
        });

        return insertResults;
    }


    static update = async (id, { name, description, price_month, price_quater, price_year, discount_rate, point_rate }) => {
        // Cập nhật thông tin vào bảng Membership
        const updateQuery = 'UPDATE Membership SET name = ?, description = ?, price_month = ?, price_quater = ?, price_year = ? WHERE id = ?';
        const updateResults = await new Promise((resolve, reject) => {
            db.query(updateQuery, [name, description, price_month, price_quater, price_year, id], (updateError, results) => {
                if (updateError) {
                    reject(new BadRequestError(updateError.message));
                    return;
                }
                resolve(results);
            });
        });
        const selectQuery = 'SELECT membership_detail_id FROM Membership WHERE id = ?';
        const selectResults = await new Promise((resolve, reject) => {
            db.query(selectQuery, [id], (selectError, results) => {
                if (selectError) {
                    reject(new BadRequestError(selectError.message));
                    return;
                }
                resolve(results);
            });
        });

        const membership_detail_id = selectResults[0].membership_detail_id;
        const updateQueryMembershipDetail = 'UPDATE MembershipDetail SET discount_rate = ?, point_rate = ? WHERE id = ?';
        const updateResultsMembershipDetail = await new Promise((resolve, reject) => {
            db.query(updateQueryMembershipDetail, [discount_rate, point_rate, membership_detail_id], (updateError, results) => {
                if (updateError) {
                    reject(new BadRequestError(updateError.message));
                    return;
                }
                resolve(results);
            });
        });

        return updateResults;
    }


    static delete = async (id) => {
        const updateQuery = 'UPDATE Membership SET status = "0" WHERE id = ?';
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

module.exports = MembershipService