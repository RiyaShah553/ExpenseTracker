const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/User')
// ! user registration 

const usersController = {
    // !register
    register: asyncHandler(async (req, res) => {
        const { username, email, password } = req.body;

        // Validate
        if (!username || !email || !password) {
            throw new Error('Please All fields are Required');
        }

        // check if already exist
        const UserExist = await User.findOne({ email });
        if (UserExist) {
            throw new Error('User Already Exist');
        }

        // Hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user and save into DB
        const userCreated = await User.create({
            username,
            email,
            password: hashedPassword
        });

        // Send response
        res.json({
            username: userCreated.username,
            email: userCreated.email,
            id: userCreated._id
        });
    }),


    // !login 
    login: asyncHandler(async (req, res) => {
        // Get data from browser 
        const { email, password } = req.body;
        // check if email is correct
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid Email or Password');
        }

        // compare user password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid Email or Password');
        }

        // here because of above both conditions email and password is correct so now verification complete
        // Generate token
        const token = jwt.sign({ id: user._id }, 'riyaKey', {
            expiresIn: '30d',
        });

        // send response
        res.json({
            message: 'Login successful',
            token,
            id: user._id,
            email: user.email,
            username: user.username,
        });
    }),

    // ! profile - AUTHORIZATION
    //check the user profile meaning it is admin or not also called as AUTHORIZATION
    profile: asyncHandler(async (req, res) => {
        // find user
        //here  req.user is an ID from isAuth Middleware 
        const user = await User.findById(req.user);
        if (!user) {
            throw new Error('User not found');
        }

        // send the response
        res.json({ username: user.username, email: user.email });
    }),


    // ! CHANGE PASSWORD
    changeUserPassword: asyncHandler(async (req, res) => {
        const { newPassword } = req.body;
        // find user
        const user = await User.findById(req.user);
        if (!user) {
            throw new Error('User not found');
        }

        // has new password before save it
        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = newHashedPassword;

        // reSave the user
        await user.save({
            validateBeforeSave: false,
        })

        // send the response
        res.json({ message: 'Password change successfully' });
    }),
    updateUserProfile: asyncHandler(async (req, res) => {
        const { email, username } = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.user, {
            username,
            email
        }, {
            new: true,
        })
        // send the response
        res.json({ message: 'Profile Updated successfully', updatedUser });
    }),
};

module.exports = usersController;