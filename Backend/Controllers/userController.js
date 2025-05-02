const bcrypt = require('bcrypt');
const User = require('../Models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const registerUser = async (req, res) => {
  const { name, branch, rollno, email, phone, year, section, password } = req.body;

  console.log("Request body:", req.body);

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists:", existingUser);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    console.log("Password received for hashing:", password);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

    // Create new user with hashed password
    const newUser = await User.create({
      name,
      branch,
      rollno,
      email,
      phone,
      year,
      section,
      password: hashedPassword, // Save hashed password
    });

    console.log("New user created:", newUser);

    return res.status(200).json({
      _id: newUser.id,
      name: newUser.name,
      branch: newUser.branch,
      email: newUser.email,
      phone: newUser.phone,
      year: newUser.year,
      section: newUser.section,
      token: generateToken(User._id),
    });
  } catch (error) {
    console.error("Error during registration:", error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getProfileInfo = async (req, res) => {
 
  const {token} = req.cookies;
const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
 const { _id } = decodedToken;
 const user = await User.findById(_id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
};

//profileUpdate

const updateProfile = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodedToken;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, phone, branch, email, section, year, password } = req.body;

    
    const updateData = {
      name: name || user.name,
      phone: phone || user.phone,
      branch: branch || user.branch,
      email: email || user.email,
      section: section || user.section,
      year: year || user.year,
    };

    if (password && password.trim() !== '') {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id, 
      updateData, 
      { new: true }
    ).select('-password'); 

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ 
      message: "Error updating profile", 
      error: error.message 
    });
  }
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login request for:", email);

  const user = await User.findOne({ email });
  if (!user) {
    console.log("User not found:", email);
    return res.status(400).json({ message: "User not found" });
  }

  console.log("User found:", user.email);
  console.log("Hashed password:", user.password);
  
  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword) {
    console.log("Password mismatch");
    return res.status(400).json({ message: "Invalid password" });
  }

  console.log("Password matched! Logging in...");
  const token = generateToken(user._id);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ message: "User logged in successfully", token });
};



const generateToken =(id) => {
    
  return jwt.sign({_id:id}, process.env.JWT_SECRET, {
       expiresIn: '1d', 
   });
  }

// Consolidating the exports to avoid overwriting
module.exports = { registerUser, loginUser ,getProfileInfo,updateProfile};
