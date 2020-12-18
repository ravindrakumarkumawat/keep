const express = require('express')
const router = express.Router()
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