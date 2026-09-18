import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import db from "./src/config/database.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Frontend
app.use(express.static(path.join(__dirname, "frontend")));

// Test route
app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "Group 8 API is working!"
    });
});

// Database test
app.get("/api/database", async (req, res) => {
    try {
        const result = await db.query("SELECT NOW()");

        res.json({
            success: true,
            message: "DATABASE CONNECTED SUCCESSFULLY",
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            time: result.rows[0].now
        });

    } catch (error) {
        console.error("Database error:", error);

        res.status(500).json({
            success: false,
            message: "DATABASE CONNECTION FAILED",
            error: error.message
        });
    }
});

// Login page
app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "frontend", "login.html")
    );
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("================================");
    console.log("       GROUP 8 LOGIN SYSTEM");
    console.log("================================");
    console.log(`Server: http://localhost:${PORT}`);
    console.log("================================");
});