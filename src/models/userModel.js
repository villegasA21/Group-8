import pool from "../config/database.js";


// Find user by email
export async function findUserByEmail(email) {

    const result = await pool.query(
        `
        SELECT
            id,
            name,
            email,
            password
        FROM users
        WHERE LOWER(email) = LOWER($1)
        `,
        [email]
    );

    return result.rows[0];
}


// Create new user
export async function createUser(
    name,
    email,
    password
) {

    const result = await pool.query(
        `
        INSERT INTO users
        (
            name,
            email,
            password
        )
        VALUES
        (
            $1,
            $2,
            $3
        )
        RETURNING
            id,
            name,
            email
        `,
        [
            name,
            email,
            password
        ]
    );

    return result.rows[0];
}