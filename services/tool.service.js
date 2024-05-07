const db = require("../dbs/initDb")
const { BadRequestError } = require("../responseHandle/error.response");
const { getInfoData } = require("../utils");

class ToolService {
    static getById = async (id) => {
        const checkQuery = 'SELECT name, description, image, price FROM Tool Where id = ? and status = "1"';
        const checkResults = await new Promise((resolve, reject) => {
            db.query(checkQuery, [id], (checkError, results) => {
                if (checkError) {
                    reject(new BadRequestError("Có lỗi xảy ra"));
                    return;
                }
                resolve(results);
            });
        });
        return checkResults;
    }
    static create = async ({ name, description, image, price }) => {
        const imageJSON = JSON.stringify(image);
        const insertQuery = 'INSERT INTO Tool (name, description, image, price) VALUES (?, ?, ?, ?)';
        const insertResults = await new Promise((resolve, reject) => {
            db.query(insertQuery, [name, description, imageJSON, price], (insertError, results) => {
                if (insertError) {
                    reject(new BadRequestError(insertError.message));
                    return;
                }
                resolve(results);
            });
        });
        return insertResults;
    }
    static update = async (id, { name, description, image, price }) => {
        const imageJSON = JSON.stringify(image);
        const updateQuery = 'UPDATE Tool SET name = ?, description = ?, image = ?, price = ? WHERE id = ?';
        const updateResults = await new Promise((resolve, reject) => {
            db.query(updateQuery, [name, description, imageJSON, price, id], (updateError, results) => {
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
        const updateQuery = 'UPDATE Tool SET status = "0" WHERE id = ?';
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

module.exports = ToolService