import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

    ssl: {
        rejectUnauthorized: false
    }
});

pool.on("connect", () => {
    console.log("PostgreSQL connected.");
});

pool.on("error", (error) => {
    console.error("PostgreSQL error:", error.message);
});

export async function testDatabase() {
    try {
        const result = await pool.query(
            "SELECT NOW() AS current_time"
        );

        console.log("================================");
        console.log("DATABASE CONNECTED SUCCESSFULLY");
        console.log("Database:", process.env.DB_NAME);
        console.log("Host:", process.env.DB_HOST);
        console.log("Time:", result.rows[0].current_time);
        console.log("================================");

        return true;

    } catch (error) {

        console.error("================================");
        console.error("DATABASE CONNECTION FAILED");
        console.error(error.message);
        console.error("================================");

        return false;
    }
}

export default pool;

