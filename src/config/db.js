import "dotenv/config";
import pg from "pg";

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};

pool.on("connect", () => {
    console.log("PostgreSQL connected.");require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
    console.log("PostgreSQL connected.");
});

pool.on("error", (error) => {
    console.error("PostgreSQL error:", error.message);
});

async function testDatabase() {
    try {
        const result = await pool.query(
            "SELECT NOW() AS current_time"
        );
        console.log("DATABASE CONNECTED SUCCESSFULLY");
        console.log("Connection:", process.env.DATABASE_URL.split('@')[1]); 
        console.log("Time:", result.rows[0].current_time);
        return true;

    } catch (error) {
        console.error("DATABASE CONNECTION FAILED");
        console.error(error.message);
        return false;
    }
}

module.exports = {
  query: (text, params) => pool.query(text, params),
  testDatabase,
  pool
};
});

pool.on("error", (error) => {
    console.error("PostgreSQL error:", error.message);
});


export async function testDatabase() {
    try {
        const result = await pool.query(
            "SELECT NOW() AS current_time"
        );
        console.log("DATABASE CONNECTED SUCCESSFULLY");
        console.log("Database:", process.env.DB_NAME);
        console.log("Host:", process.env.DB_HOST);
        console.log("Time:", result.rows[0].current_time);
        return true;

    } catch (error) {
        console.error("DATABASE CONNECTION FAILED");
        console.error(error.message);
        return false;
    }
}

export default pool;

