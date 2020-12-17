const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

/**
 * Register a new user
 * @param req
 * @param res
 * @return success | error
 */
const registerUser = async (req, res) => {

  try {
    const {firstName, lastName, email, password, passwordCheck } = req.body

    if (!firstName || !lastName || !email || !password || !passwordCheck) {
      return res.status(400).json({
        msg: "Not all fields have been entered."
      })
    }
    if (password.length < 5){
      return res.status(400).json({ 
        msg: "The password needs to be at least 5 characters long." 
      })
    }
    if (password !== passwordCheck) {
      return res.status(400).json({ 
        msg: "Enter the same password twice for verification." 
      })
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        msg: "Email already exists."
      })
    }

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new User({
      firstName,
      lastName, 
      email,
      password: passwordHash
    })

    const savedUser = await newUser.save()
    
    const token = jwt.sign({ id: savedUser._id}, process.env.JWT_SECRET, {
      expiresIn: '3 days'
    })
    res.json({token, savedUser})

  } catch(error) {
    res.status(500).json({error: error.message})
  }
}

/**
 * Login user
 * @param req
 * @param rep
 * @result {jwt} | error
 */
const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body

    if( !email || !password ) {
      res.status(400).json({ 
        msg: "Enter All fields"
      })
    }

    const user = await User.findOne({ email })
    if(!user) {
      return res.status(400).json({
        msg: "Email has not been registered"
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
      return res.status(400).json({
        msg: "Incorrect password"
      })
    }

    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, {
      expiresIn: '3 days'
    })

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName
      },
    })

  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

/**
 * token Validation
 * @param req
 * @param res
 * @return true or false | error
 */
const tokenIsValid = async (req, res) => {
  try {
    const token = req.header("x-auth-token")
    if (!token) return res.json(false)

    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if (!verified) return res.json(false)

    const user = await User.findById(verified.id)
    if (!user) return res.json(false)

    return res.json(true)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

/**
 * Check user
 * @param req
 * @param res
 * @return {user} | error
 */
const checkUser = async (req, res) => {
  const user = await User.findById(req.user)
  res.json({
    displayName: user.displayName,
    id: user._id,
  })
}

/**
 * Delete user
 * @param req
 * @param res
 * @return {user} | error
 */
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user)
    res.json(deletedUser)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  registerUser,
  loginUser,
  checkUser,
  tokenIsValid,
  deleteUser
}