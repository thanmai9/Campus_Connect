const express = require('express');
const { registerUser,loginUser,getProfileInfo,updateProfile } = require('../Controllers/userController');

const router = express.Router();

// POST /api/users/register
router.post('/register', registerUser);
router.post('/login',loginUser);
router.get('/profile', getProfileInfo);
router.put('/profile', updateProfile);

module.exports = router;
