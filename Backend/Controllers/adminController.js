const bcrypt = require("bcryptjs");
const Admin = require("../Models/admin");

// Login Admin
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const userRecord = await Admin.findOne({ email });
  
      if (!userRecord) {
        console.log("Mail not found for email:", email);
        return res.status(400).json({ message: "Mail not found" });
      }
  
      console.log("Entered Password:", password);
      console.log("Stored Hashed Password:", userRecord.password);
  
      // Compare passwords
      const isPassword = await bcrypt.compare(password, userRecord.password);
  
      if (isPassword) {
        console.log("Login successful for email:", email);
        return res.status(200).json({ message: "Login successful", user: userRecord });
      } else {
        console.log("Incorrect password for email:", email);
        return res.status(400).json({ message: "Incorrect password" });
      }
    } catch (error) {
      console.error("Error during login:", error.stack);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

// Create Admin
const createAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if admin already exists
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      console.log("User already exists:", existingUser.email);
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    console.log("Password received for hashing:", password);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin with hashed password
    const newUser = await Admin.create({
      email,
      password: hashedPassword,
    });

    console.log("New user created with email:", newUser.email);

    return res.status(200).json({
      _id: newUser.id,
      email: newUser.email,
    });
  } catch (error) {
    console.error("Error during registration:", error.stack);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Exporting functions
module.exports = { loginAdmin, createAdmin };
