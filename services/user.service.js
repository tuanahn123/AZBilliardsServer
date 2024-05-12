const db = require("../dbs/initDb")
const bcrypt = require("bcrypt")
const { BadRequestError, InternalServerError } = require("../responseHandle/error.response");
const { getInfoData } = require("../utils");

class UserService {
  static getAll = async () => {
    const checkQuery = 'SELECT fullname, username, email, role FROM User';
    const checkResults = await new Promise((resolve, reject) => {
      db.query(checkQuery, (checkError, results) => {
        if (checkError) {
          reject(new BadRequestError("Error checking for existing email or username"));
          return;
        }
        resolve(results);
      });
    });
    return checkResults;
  }
  static signUp = async ({ username, fullname, password, email }) => {
    try {
      // Kiểm tra xem email hoặc username đã tồn tại chưa
      const checkQuery = 'SELECT * FROM User WHERE email = ? OR username = ?';
      const checkResults = await new Promise((resolve, reject) => {
        db.query(checkQuery, [email, username], (checkError, results) => {
          if (checkError) {
            reject(new BadRequestError("Error checking for existing email or username"));
            return;
          }
          resolve(results);
        });
      });

      // Nếu đã tồn tại email hoặc username trong cơ sở dữ liệu
      if (checkResults.length > 0) {
        throw new BadRequestError("Email hoặc username đã tồn tại");
      }

      // Nếu không có email hoặc username nào tồn tại, tiến hành thêm bản ghi mới
      const hashPassword = await bcrypt.hash(password, 10);
      const insertQuery = 'INSERT INTO User (username, fullname, password, email) VALUES (?, ?, ?, ?)';
      const insertResults = await new Promise((resolve, reject) => {
        db.query(insertQuery, [username, fullname, hashPassword, email], (insertError, results) => {
          if (insertError) {
            reject(new BadRequestError(insertError.message));
            return;
          }
          resolve(results);
        });
      });
      return insertResults[0];
    } catch (error) {
      throw error;
    }
  };

}

module.exports = UserService