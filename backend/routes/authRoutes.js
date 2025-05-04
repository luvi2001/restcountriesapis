const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const User = require("../models/User");

// POST /api/auth/signup
router.post('/signup', authController.signup);
router.post('/login', authController.login);




router.post("/favorite", async (req, res) => {
    const { email, country } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });
  
      if (user.favoriteCountries.includes(country)) {
        return res.status(400).json({ message: "Country already added to favourites." });
      }
  
      user.favoriteCountries.push(country);
      await user.save();
  
      res.status(200).json({ message: "Country added to favourites." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });
  

module.exports = router;
