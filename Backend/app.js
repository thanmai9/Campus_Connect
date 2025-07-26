const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');
const connectionDB = require('./config/database');
const adminRoutes = require('./Routers/adminRoutes');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;

dotenv.config();
const app = express();

// Configure CORS with explicit headers
const allowedOrigins = [
  'https://campus-connect-1-pil6.onrender.com',
  'http://localhost:3000'
];

// Enhanced CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
    return callback(new Error(msg), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Authorization']
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/users', require('./Routers/userRoutes'));
app.use('/api/admins', require('./Routers/adminRoutes'));

app.get('/', (req, res) => {
  res.send('Backend is live');
});

// Database connection and server start
(async () => {
  try {
    await connectionDB();
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (err) {
    console.error("Failed to connect to the database. Server not started.", err.message);
    process.exit(1);
  }
})();
