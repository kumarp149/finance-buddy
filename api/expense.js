const mysql = require('mysql2/promise');


const dbSecrets = require("../secrets/creds.json").db;

// const pool = mysql.createPool({
//     host: dbSecrets.hostname,
//     user: dbSecrets.username,
//     password: dbSecrets.password,
//     database: dbSecrets.dbName
// })

const fetchExpenses = async (fromDate, toDate, userId) => {
    console.log(fromDate);
    console.log(toDate);
    console.log(userId);
    try {
        const connection = await mysql.createConnection({
            host: dbSecrets.hostname,
            user: dbSecrets.username,
            password: dbSecrets.password,
            database: dbSecrets.dbName
        });
        const [rows, fields] = await connection.execute('SELECT * FROM expenses WHERE userId = ? AND date BETWEEN ? AND ?',[userId,fromDate,toDate]);
        await connection.end();
        //console.log(rows);
        return rows;
    } catch (error) {
        console.log("ERROR: " + error);
        return null;
    }
}

const updateExpense = async (expenseId,expenseName,expenseAmount,expenseDate,expenseCategory) => {
    try {
        const connection = await mysql.createConnection({
            host: dbSecrets.hostname,
            user: dbSecrets.username,
            password: dbSecrets.password,
            database: dbSecrets.dbName
        });
        const [rows, fields] = await connection.execute('UPDATE expenses SET title = ?, amount = ?, date = ?, category = ? WHERE id = ?',[expenseName,expenseAmount,expenseDate,expenseCategory,expenseId]);
        await connection.end();
        return rows.affectedRows;
    } catch (error) {
        console.log("ERROR: " + error);
        return null;
    }
}

const deleteExpenses = async (expenseId) => {
    try {
        const connection = await mysql.createConnection({
            host: dbSecrets.hostname,
            user: dbSecrets.username,
            password: dbSecrets.password,
            database: dbSecrets.dbName
        });
        const [rows, fields] = await connection.execute("DELETE FROM expenses WHERE id = ?",[expenseId])
        await connection.end();
        return rows.affectedRows;
    } catch (error) {
        console.log("ERROR: " + error);
        return null;
    }
}

module.exports = {fetchExpenses, updateExpense, deleteExpenses}