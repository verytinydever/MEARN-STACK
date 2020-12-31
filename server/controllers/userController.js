import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

//*@desc  Auth user & get token
//*@route  POST /api/users/login
//*@access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid Email or password')
  }
})

//*@desc  Get user profile
//*@route  POST /api/users/profile
//*@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User Not found')
  }
})

//*@desc  Register a new user
//*@route  POST /api/users/
//*@access Publix
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body

  const userExists = await User.findOne({ email: email })

  if (userExists) {
    res.status(400)
    throw new Error('User Already Registered')
  }
  const user = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    username: username,
    password: password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.name,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid User Data')
  }
})

export { authUser, getUserProfile, registerUser }
