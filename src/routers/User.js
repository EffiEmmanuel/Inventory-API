const bcrypt = require('bcryptjs')
const express = require('express')
const router = express.Router()

const { createUser, getAllUsers, getUserByName, getUserByMobile, getUserByEmail, deleteUser, getUserById, updateUser, verifyUser} = require('../controllers/user')
const User = require('../models/User')
const userVerification = require('../models/userVerification')

// CREATE user
router.post('/users', createUser)
// GET all users
router.get('/users', getAllUsers)
// GET a specific user
router.get('/users/:userId', getUserById)
// GET a user by detail provided
router.get('/users/username/:username', getUserByName)
// GET a user by mobile
router.get('/users/mobile/:userMobile', getUserByMobile)
// GET a user by email
router.get('/users/email/:userEmail', getUserByEmail)
// UPDATE specific user details
router.patch('/users/:userId', updateUser)
// DELETE specific user
router.delete('/users/:userId', deleteUser)

// VERIFY email route
router.get('/user/verify/:userId/:code', verifyUser)

module.exports = router