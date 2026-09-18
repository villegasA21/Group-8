import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
    findUserByEmail,
    createUser
} from "../models/userModel.js";


// ============================
// REGISTER
// ============================

export async function register(req, res) {

    try {

        const name =
            String(req.body.name || "").trim();

        const email =
            String(req.body.email || "")
                .trim()
                .toLowerCase();

        const password =
            String(req.body.password || "");


        if (!name || !email || !password) {

            return res.status(400).json({
                success: false,
                message: "Please fill in all fields."
            });

        }


        if (password.length < 6) {

            return res.status(400).json({
                success: false,
                message:
                    "Password must be at least 6 characters."
            });

        }


        const existingUser =
            await findUserByEmail(email);


        if (existingUser) {

            return res.status(409).json({
                success: false,
                message:
                    "Email is already registered."
            });

        }


        const hashedPassword =
            await bcrypt.hash(password, 10);


        const user =
            await createUser(
                name,
                email,
                hashedPassword
            );


        res.status(201).json({

            success: true,

            message:
                "Registration successful!",

            user

        });

    } catch (error) {

        console.error(
            "Registration error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Registration failed."

        });

    }
}


// ============================
// LOGIN
// ============================

export async function login(req, res) {

    try {

        const email =
            String(req.body.email || "")
                .trim()
                .toLowerCase();

        const password =
            String(req.body.password || "");


        if (!email || !password) {

            return res.status(400).json({

                success: false,

                message:
                    "Please enter email and password."

            });

        }


        const user =
            await findUserByEmail(email);


        if (!user) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password."

            });

        }


        const passwordCorrect =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!passwordCorrect) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password."

            });

        }


        const token =
            jwt.sign(

                {
                    id: user.id,
                    email: user.email
                },

                process.env.JWT_SECRET,

                {
                    expiresIn: "1h"
                }

            );


        res.json({

            success: true,

            message:
                "Login successful!",

            token,

            user: {

                id: user.id,

                name: user.name,

                email: user.email

            }

        });

    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Login failed."

        });

    }
}