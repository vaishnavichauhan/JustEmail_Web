import mysql from "mysql2/promise";
export const db = mysql.createPool({
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "jeenwebs",
    database: process.env.MYSQL_DATABASE || "justemails_db",
    waitForConnections: true,
    connectionLimit: 10,
    connectTimeout: 2000,
});