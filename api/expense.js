const mysql = require('mysql2');

const dbSecrets = require("../secrets/creds.json").db;

const pool = mysql.createPool({
    host: dbSecrets.hostname,
    user: dbSecrets.username,
    password: dbSecrets.password,
    database: dbSecrets.dbName
})

const fetchExpenses = async (fromDate, toDate, userId) => {
    try {
        const connection = pool.getConnection();
        const [rows, fields] = await connection.execute('SELECT * FROM expenses WHERE userId = ? AND data BETWEEN ? AND ?',[userId,fromDate,toDate]);
        connection.release();
        return rows;
    } catch (error) {
        console.log("ERROR: " + error);
        return null;
    }
}

const updateExpense = async (expenseId,expenseName,expenseAmount,expenseDate,expenseCategory) => {
    try {
        const connection = pool.getConnection();
        const [rows, fields] = await connection.execute('UPDATE expenses SET title = ?, amount = ?, date = ?, category = ? WHERE id = ?',[expenseName,expenseAmount,expenseDate,expenseCategory,expenseId]);
        connection.release();
        return rows.affectedRows;
    } catch (error) {
        console.log("ERROR: " + error);
        return null;
    }
}

const deleteExpenses = async (expenseId) => {
    try {
        const connection = pool.getConnection();
        const [rows, fields] = await connection.execute("DELETE FROM expenses WHERE id = ?",[expenseId])
        connection.release();
        return rows.affectedRows;
    } catch (error) {
        console.log("ERROR: " + error);
        return null;
    }
}

module.exports = {fetchExpenses, updateExpense, deleteExpenses}