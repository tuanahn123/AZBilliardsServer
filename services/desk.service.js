const db = require("../dbs/initDb")
const bcrypt = require("bcrypt")
const { BadRequestError, InternalServerError } = require("../responseHandle/error.response");
const { getInfoData } = require("../utils");

class DeskService {
    static getAll = async (id) => {
        const checkQuery = 'SELECT * FROM Desk Where status = "1"';
        const checkResults = await new Promise((resolve, reject) => {
            db.query(checkQuery, (checkError, results) => {
                if (checkError) {
                    reject(new BadRequestError("Có lỗi xảy ra"));
                    return;
                }
                resolve(results);
            });
        });
        return checkResults;
    }
    static getById = async (id) => {
        const checkQuery = 'SELECT * FROM Desk Where id = ? and status = "1"';
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
    static create = async ({
        name, description, type, image, outer_dimension, usable_dimension, hole_dimension, color, fabric, cushion_rail, cushion,
        edge_and_trim, stone, rubber_band, discount_rate, price, price_combo_0, price_combo_1, price_combo_2, id_tool
    }) => {
        const insertQuery = 'INSERT INTO Desk (name, description, type, image, outer_dimension, usable_dimension, hole_dimension, color, fabric, cushion_rail, cushion, edge_and_trim, stone, rubber_band, discount_rate, price, price_combo_0, price_combo_1, price_combo_2, id_tool) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const insertResults = await new Promise((resolve, reject) => {
            db.query(insertQuery, [
                name, description, type, image, outer_dimension, usable_dimension, hole_dimension, color, fabric, cushion_rail, cushion,
                edge_and_trim, stone, rubber_band, discount_rate, price, price_combo_0, price_combo_1, price_combo_2, id_tool
            ], (insertError, results) => {
                if (insertError) {
                    reject(new BadRequestError(insertError.message));
                    return;
                }
                resolve(results);
            });
        });
        return insertResults;
    }
    static update = async (id, { name, description, type, image, outer_dimension, usable_dimension, hole_dimension, color, fabric, cushion_rail, cushion, edge_and_trim, stone, rubber_band, discount_rate, price, price_combo_0, price_combo_1, price_combo_2, id_tool }) => {
        const imageJSON = JSON.stringify(image);
        const updateQuery = 'UPDATE Desk SET name = ?, description = ?, type = ?, image = ?, outer_dimension = ?, usable_dimension = ?, hole_dimension = ?, color = ?, fabric = ?, cushion_rail = ?, cushion = ?, edge_and_trim = ?, stone = ?, rubber_band = ?, discount_rate = ?, price = ?, price_combo_0 = ?, price_combo_1 = ?, price_combo_2 = ?, id_tool = ? WHERE id = ?';
        const updateResults = await new Promise((resolve, reject) => {
            db.query(updateQuery, [name, description, type, imageJSON, outer_dimension, usable_dimension, hole_dimension, color, fabric, cushion_rail, cushion, edge_and_trim, stone, rubber_band, discount_rate, price, price_combo_0, price_combo_1, price_combo_2, id_tool, id], (updateError, results) => {
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
        const updateQuery = 'UPDATE Desk SET status = "0" WHERE id = ?';
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

module.exports = DeskService