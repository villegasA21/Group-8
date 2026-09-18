import "dotenv/config";

import express from "express";
import path from "path";

import {
    fileURLToPath
} from "url";

import authRoutes
    from "./src/routes/authRoutes.js";

import {
    testDatabase
} from "./src/config/database.js";


const app = express();


// Get current directory
const __filename =
    fileURLToPath(import.meta.url);

const __dirname =
    path.dirname(__filename);


// ============================
// MIDDLEWARE
// ============================

app.use(
    express.json()
);

app.use(
    express.urlencoded({
        extended: true
    })
);


// ============================
// FRONTEND
// ============================

app.use(
    express.static(
        path.join(
            __dirname,
            "frontend"
        )
    )
);


// ============================
// API
// ============================

app.use(
    "/api/auth",
    authRoutes
);


// ============================
// TEST API
// ============================

app.get(
    "/api/test",
    (req, res) => {

        res.json({

            success: true,

            message:
                "API is working!"

        });

    }
);


// ============================
// DATABASE TEST
// ============================

app.get(
    "/api/database",
    async (req, res) => {

        const connected =
            await testDatabase();


        if (connected) {

            res.json({

                success: true,

                message:
                    "Database connected successfully!"

            });

        } else {

            res.status(500).json({

                success: false,

                message:
                    "Database connection failed."

            });

        }

    }
);


// ============================
// LOGIN PAGE
// ============================

app.get(
    "/",
    (req, res) => {

        res.sendFile(
            path.join(
                __dirname,
                "frontend",
                "login.html"
            )
        );

    }
);


// ============================
// START SERVER
// ============================

const PORT =
    process.env.PORT || 3000;


app.listen(
    PORT,
    async () => {

        console.log("");
        console.log(
            "================================"
        );
        console.log(
            "       GROUP 8 LOGIN SYSTEM"
        );
        console.log(
            "================================"
        );
        console.log(
            `Server: http://localhost:${PORT}`
        );
        console.log(
            "================================"
        );

        await testDatabase();

    }
);