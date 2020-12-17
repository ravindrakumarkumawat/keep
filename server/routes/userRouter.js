const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const router = express.Router()
const User = require('../models/userModel')
const auth = require("../middleware/auth")
const { registerUser, loginUser, checkUser, 
  tokenIsValid, deleteUser } = require('../controllers/user')

// Register user
router.post("/register", registerUser)

// Login user
router.post("/login", loginUser)

// token validation
router.post("/tokenIsValid", tokenIsValid)

// delere user
router.delete("/delete", auth, deleteUser)

// check user
router.get("/", auth, checkUser)
module.exports = router