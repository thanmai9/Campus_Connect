const mongoose = require("mongoose");
require('dotenv').config(); // Load environment variables

const connectDB = async () => {
    try {
        const connect = await mongoose.connect("mongodb+srv://<your gmail>:<your password>@cluster0.n1rnd.mongodb.net/mernapp");
        console.log("database is connected");
        
    } catch (e) {
        console.log(e);
    }
};

module.exports = connectDB;
