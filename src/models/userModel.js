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

const getAllUsers = async () => {
  const result = await db.query('SELECT id, email, created_at FROM users ORDER BY created_at DESC');
  return result.rows;
};

const updateUser = async (id, email) => {
  const result = await db.query(
    'UPDATE users SET email = $1 WHERE id = $2 RETURNING id, email, created_at',
    [email, id]
  );
  return result.rows[0];
};

const deleteUser = async (id) => {
  const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
  return result.rows[0];
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateRefreshToken,
  getAllUsers,
  updateUser,
  deleteUser
};