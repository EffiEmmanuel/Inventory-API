require('dotenv').config()
const User = require('../models/User')
const userVerification = require('../models/userVerification')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const { v4: uuidv4 } = require('uuid')

const createUser = async (req, res) => {
    const { name, email, mobile, username, password } = req.body

    console.log(process.env.AUTH_EMAIL)
    console.log(process.env.AUTH_PASSWORD)

    if (!name || !email || !mobile || !username || !password) {
        return res.status(401).send(`Some fields are missing!: ${mobile}, ${username}, ${password}, ${name}, ${email}`)
    }

    let newUser

    try {
        newUser = await User.findOne({ email })
        console.log(newUser)
    } catch (error) {
        return res.status(500).send(`An error occured: ${error.message}`)
    }

    if (newUser) {
        return res.status(400).send('This user already exists! Try logging in')
    }

    // Hash the password
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const hashedPassword = bcrypt.hashSync(password, salt)

    const currentUrl = 'http://localhost:3000'
    const verificationCode = uuidv4()

    newUser = new User({
        name,
        email,
        mobile,
        username,
        password: hashedPassword,
        accountActivationToken: verificationCode
    })

    let tempUser

    try {
        tempUser = await newUser.save()
    } catch (error) {
        return res.status(500).send('There was a problem creating  your account, please try again 1')
    }

    if (!tempUser) {
        return res.status(400).send('There was a problem creating  your account, please try again 2')
    }


    const url = `${currentUrl + "/user/verify/" + tempUser._id + "/" + verificationCode}`
    console.log(url)


    const hashedCode = bcrypt.hashSync(verificationCode, salt)

    const newVerification = new userVerification({
        userId: tempUser._id,
        verificationCode: hashedCode,
        createdAt: Date.now(),
        expiresAt: Date.now() + 21600000,
    })


    try {
        await newVerification.save()
    } catch (error) {
        return res.status(500).send('There was a problem sending the verification code. Please try again 3')
    }

    const sender = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASSWORD
        }
    });


    const mail = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: 'Your Email Veirication Code',
        html: '<p><h3 style="color: green">Dear ' + tempUser.name + ', </h3>Thanks for signing up on ' + currentUrl + '</p><p>Click on the link below to verify your email</p><p><a href=' + url + '>Click Here</a></p>'
    };

    sender.sendMail(mail, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent successfully: " + info.response);
        }
    });

    res.status(201).json(tempUser)
}


// User verification route handler
const verifyUser = async (req, res) => {
    let { userId, code } = req.params
    console.log(userId);
    console.log(code);

    let user, checkUser

    try {
        user = await userVerification.findOne({ userId })
        checkUser = await User.findOne({ _id: userId })
        console.log(user)
    } catch (error) {
        return res.status(500).send('An error occured. Please try again')
    }

    if (!user || !checkUser) {
        return res.status(404).send('User not found')
    }

    // If the verification code has expired
    if (Date.now() > user.expiresAt) {
        return res.status(404).send('Verification code expired. Request for a new one by visiting https://localhost/requestVerificationCode')
    }

    // Compare the verification code hash
    bcrypt.compare(code, user.verificationCode, async (error, result) => {
        if (result) {
            checkUser.email_verified = true
            await checkUser.save()
            res.status(201).json({ message: 'User successfully verified' })
        }
    })
}

// Returns all the users in the database
const getAllUsers = async (req, res) => {
    let users
    try {
        users = await User.find()
    } catch (error) {
        return res.status(500).send(`An error occured: ${error.message}`)
    }

    if (!users) {
        return res.status(404).send('No user has been added')
    }

    res.status(200).json({ users })

}

// Deletes a specific user by the id provided
const deleteUser = async (req, res) => {
    const userId = req.params.userId

    let user
    try {
        user = await User.findByIdAndRemove(userId)
    } catch (error) {
        return res.status(500).send(`An error occured: ${error.message}`)
    }

    if (!user) {
        return res.status(400).send('Unable to delete user. Please try again')
    }

    res.status(201).json(user)
}

const getUserById = async (req, res) => {
    let userId = req.params.userId

    let user
    try {
        user = await User.findById(userId)
    } catch (error) {
        return res.status(500).send(`An error occured: ${error.message}`)
    }

    if (!user) {
        return res.status(400).send('User does not exist!')
    }

    res.status(200).json(user)
}

const getUserByName = async (req, res) => {
    let username = req.params.username

    let user
    try {
        user = await User.find({ name: username })

    } catch (error) {
        return res.status(500).send(`An error occured: ${error.message}`)
    }

    if (!user) {
        return res.status(400).send('User does not exist!')
    }

    res.status(200).json(user)
}

const getUserByMobile = async (req, res) => {
    let userMobile = req.params.userMobile

    let user
    try {
        user = await User.findOne({ mobile: userMobile })
    } catch (error) {
        return res.status(500).send(`An error occured: ${error.message}`)
    }

    if (!user) {
        return res.status(400).send('User does not exist!')
    }

    res.status(200).json(user)
}

const getUserByEmail = async (req, res) => {
    let userEmail = req.params.userEmail

    let user
    try {
        user = await User.findOne({ email: userEmail })

    } catch (error) {
        return res.status(500).send(`An error occured: ${error.message}`)
    }

    if (!user) {
        // throw new Error('User does not exist!')
        return res.status(400).send('User does not exist!')
    }

    res.status(200).json(user)
}

// UPDATE user controller
const updateUser = async (req, res) => {
    let userId = req.params.userId

    let { name, email, mobile, password } = req.body

    console.log(name, email, mobile, password)

    let user, updatedUser
    try {
        user = await User.findById(userId)
        console.log(user)
        if(name !== '' && name !== user.name) {
            user.name = name
        }
        if(email !== '' && email !== user.email) {
            user.email = email
        }
        if(mobile !== '' && mobile !== user.mobile) {
            user.mobile = mobile
        }
        if(password !== '') {
            const saltRounds = 10
            const salt = bcrypt.genSaltSync(saltRounds)
            let hashedPassword = bcrypt.hashSync(password)

            bcrypt.compare(password, user.password, (error, result) => {
                if(!result) {
                    user.password = hashedPassword
                }
            });
        }

        updatedUser = await user.save()
        
    } catch (error) {
        return res.status(500).send(`An error occured: ${error.message}`)
    }

    if (!user) {
        return res.status(400).send('Unable to update user. Please try again')
    }

    res.status(201).json(updatedUser)
}



module.exports = {
    createUser,
    getAllUsers,
    deleteUser,
    getUserById,
    getUserByName,
    getUserByMobile,
    getUserByEmail,
    updateUser,
    verifyUser
}