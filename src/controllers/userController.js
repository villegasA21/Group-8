const User = require('../models/userModel');

const getUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const user = await User.getUserById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User/Student not found' });
    }
    
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required for update' });
    }

    const updatedUser = await User.updateUser(userId, email);
    
    if (!updatedUser) {
      return res.status(404).json({ error: 'User/Student not found' });
    }

    res.json({ user: updatedUser });
  } catch (err) {
    // Handle unique constraint violation (e.g., email already exists)
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Email is already in use by another user' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const deletedUser = await User.deleteUser(userId);
    
    if (!deletedUser) {
      return res.status(404).json({ error: 'User/Student not found' });
    }

    res.json({ message: 'User/Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getUsers, getUser, updateUser, deleteUser };