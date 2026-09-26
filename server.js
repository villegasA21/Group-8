// Load environment variables first
require('dotenv').config();

const app = require('./src/app.js'); 
const { testDatabase } = require('./src/config/db.js');

const PORT = process.env.PORT || 3000;

async function startServer() {
    const isDbConnected = await testDatabase();
    
    if (!isDbConnected) {
        console.error("Shutting down server due to database connection failure.");
        process.exit(1);
    }

    app.listen(PORT, () => {
        console.log("SERVER RUNNING SUCCESSFULLY");
        console.log(`Port: ${PORT}`);
        console.log(`Swagger Docs: http://localhost:${PORT}/api/docs`);
    });
}

startServer();