const bcrypt = require('bcrypt');
const db = require('./initDb');
async function createAdmin() {
    const username = 'admin';
    const fullname = 'Admin';
    const email = 'admin@example.com';
    const password = '111';
    const hashPassword = await bcrypt.hash(password, 10);
    const insertQuery = 'INSERT INTO User (username, fullname, password, email,role) VALUES (?, ?, ?, ?,?)';
    const insertResults = await new Promise((resolve, reject) => {
        db.query(insertQuery, [username, fullname, hashPassword, email,"0"], (insertError, results) => {
            if (insertError) {
                reject(new BadRequestError(insertError.message));
                return;
            }
            resolve(results);
        });
    });
    console.log("Import User Successfully!!!")
}
// createAdmin()