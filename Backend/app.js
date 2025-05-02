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
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,              
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());



// Correct route
app.use('/api/users', require('./Routers/userRoutes'));
app.use('/api/admins',require('./Routers/adminRoutes'));


(async () => {
  try {
      await connectionDB();
      app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (err) {
      console.error("Failed to connect to the database. Server not started.", err.message);
  }
})();
