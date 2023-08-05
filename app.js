const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const router = require('./src/routes');
const swaggerOptions = require('./swaggerUi/swaggerOptions');
const startUrlChecker = require('./CronWorker/url_checker');
const dbConnection = require('./src/db');

// Load env vars
dotenv.config();

const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));

async function main() {
    try {
        await dbConnection(process.env.MONGO_URI);
    } catch (error) {
        console.error(error.message);
    }
}

// Middleware to handle errors
app.use((err, req, res, next) => {
    res.status(err.statusCode || 400).json({
        message: err.message,
    });
    next();
});

// Only start the server if not in a test environment
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

main();

module.exports = app;
