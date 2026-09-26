const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const setupSwagger = require('./config/swagger'); 
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(cookieParser());

setupSwagger(app); 

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;