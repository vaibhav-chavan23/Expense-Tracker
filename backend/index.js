require('dotenv').config(); // ← MUST be first line before anything else
require('./Models/db');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const ExpenseRouter = require('./Routes/ExpenseRouter');
const ensureAuthenticated = require('./Middlewares/Auth');

const PORT = process.env.PORT || 8080;

// ✅ CORS — allow your Vercel frontend URL + localhost for dev
const allowedOrigins = [
    process.env.FRONTEND_URL,          // e.g. https://your-app.vercel.app
    'http://localhost:3000',
    'http://localhost:5173',
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl, Render health checks)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true
}));

app.use(bodyParser.json());

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/expenses', ensureAuthenticated, ExpenseRouter);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
