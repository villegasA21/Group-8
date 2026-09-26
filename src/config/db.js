require('dotenv').config();
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