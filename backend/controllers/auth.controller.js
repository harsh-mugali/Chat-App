import bcrypt from 'bcryptjs';
import User from '../models/user.models.js';
import generateTokenSetCookie from '../utils/generateToken.js';
export const signup = async (req, res) => {
    try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }
    const user = await User.findOne({ username });
    if (user) {
        return res.status(400).json({ error: 'User already exists' });
    }
    // hash the password
    //https://avatar.iran.liara.run/public/boy?username=Scott

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const newUser = new User({ 
        fullName, 
        username, 
        password: hashedPassword, 
        gender, 
        profilePicture: gender === 'male' ? boyProfilePicture : girlProfilePicture });

    if(newUser) {
        //Generate JWT Token and set it to a cookie
        generateTokenSetCookie(newUser._id, res);
        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePicture: newUser.profilePicture,
        });
    }
    else {
        return res.status(400).json({ error: 'Invalid user data' });
    }
    } catch (error) {
        console.log('Error signing up', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const login = (req, res) => {
    console.log('Login Route');
};
export const logout = (req, res) => {
    console.log('Logout Route');
};