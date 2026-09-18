import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

    // Important for a remote PostgreSQL server
    ssl: {
        rejectUnauthorized: false
    }
});

pool.on("connect", () => {
    console.log("PostgreSQL connected.");
    console.log("================================");
    console.log("DATABASE CONNECTED SUCCESSFULLY");
    console.log(`Database: ${process.env.DB_NAME}`);
    console.log(`Host: ${process.env.DB_HOST}`);
    console.log("================================");
});

pool.on("error", (error) => {
    console.error("PostgreSQL pool error:", error);
});

export default pool;