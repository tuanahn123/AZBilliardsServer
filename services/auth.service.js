const db = require("../dbs/initDb")
const bcrypt = require("bcrypt")
const { AuthFailureError } = require("../responseHandle/error.response")

class AuthService {
    static login = async (username, password) => {
        const checkQuery = 'SELECT * FROM User WHERE username = ?';
        const checkResults = await new Promise((resolve, reject) => {
            db.query(checkQuery, [username], (checkError, results) => {
                if (checkError) {
                    reject(checkError);
                    reject(new AuthFailureError("Error checking for existing email or username"));
                    return;
                }
                resolve(results);
            });
        });
        if (!checkResults[0]) {
            throw new AuthFailureError("Thông tin tài khoản hoặc mật khẩu không đúng");
        }
        const match = await bcrypt.compare(password, checkResults[0].password)
        if (!match) {
            throw new AuthFailureError("Thông tin tài khoản hoặc mật khẩu không đúng");
        }
        return {
            id: checkResults[0].id,
            username: checkResults[0].username,
            fullname: checkResults[0].fullname,
            email: checkResults[0].email,
            role: checkResults[0].role
        }
    }
}

module.exports = AuthService