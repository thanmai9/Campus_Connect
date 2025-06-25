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

// Configure CORS with proper origin handling
const allowedOrigins = [
  'https://campus-connect-9uf3.onrender.com/',
  'http://localhost:3000' // For local development
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable preflight for all routes

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
  }
})();
