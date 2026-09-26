const db = require('../config/db');

const createUser = async (email, passwordHash) => {
  const result = await db.query(
    'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at',
    [email, passwordHash]
  );
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

const getUserById = async (id) => {
  const result = await db.query('SELECT id, email, created_at FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

const updateRefreshToken = async (id, refreshToken) => {
  await db.query('UPDATE users SET refresh_token = $1 WHERE id = $2', [refreshToken, id]);
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateRefreshToken
};