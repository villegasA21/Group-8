import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionString: process.env.DB_CONNECTION
});

pool.connect().then(() => {
    console.log("Database Connected Successfully!");
})
.catch((err) => {
    console.log("Database Connection Error:", err);
    process.exit(1);
})

export default pool;
