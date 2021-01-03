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
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
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

//*@desc  Update user profile
//*@route  PUT /api/users/profile
//*@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }
    const updateUser = await user.save()
    res.json({
      _id: updateUser._id,
      firstName: updateUser.name,
      lastName: updateUser.lastName,
      username: updateUser.username,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User Not found')
  }
})

//*@desc  Get all users
//*@route  POST /api/users
//*@access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  if (users) {
    res.json(users)
  } else {
    res.status(404)
    throw new Error('User Not found')
  }
})

export { authUser, getUserProfile, registerUser, updateUserProfile, getUsers }
