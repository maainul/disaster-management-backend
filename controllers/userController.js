import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { validateUser } from './../validations/userValidation.js';
import { formatValidationErrors } from '../utils/errorFormatter.js';

// Register User
export const registerUser = async (req, res) => {
    try {
        const { error } = validateUser(req.body)
        if (error) {
            return res.status(400).json(formatValidationErrors(error))
        }
        const { name, email, phone, password, passwordVerify, role } = req.body
        const errors = []
        //check If User already exists
        const userExists = await User.findOne({ where: { phone } })
        if (userExists) {
            errors.push({
                label: 'phone',
                message: 'User with this phone already exists',
            })
        }
        const emailExists = await User.findOne({ where: { email } })
        if (emailExists) {
            errors.push({
                label: 'email',
                message: 'User with this email already exists',
            })
        }

        // password match
        if (password != passwordVerify) {
            errors.push({
                lable: 'passwordVerify',
                message: `Password doesn't Match`
            })
        }
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                error: errors
            })
        }
        // Hash Password
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)
        await User.create({ name, email, phone, password: passwordHash, role })
        return res.status(200).json({
            success: true,
            message: 'User Created Successfully',
        })
    } catch (error) {
        console.error("Error Creating User", error);
        return res.status(500).json({
            success: false,
            message: "Error Creating User",
            error: error.message
        });
    }
};

// Login User
export const loginUserCtrl = async (req, res) => {
    try {
        const { name, password } = req.body

        //Collect errors
        const errors = []

        if (!name || !password) {
            errors.push({
                label: 'name',
                message: `Please Enter Username and Pasword`
            })
        }

        //check if User already exists
        let userId = ''
        if (name && password) {
            const userExists = await User.findOne({ where: { name } })
            if (!userExists) {
                errors.push({
                    label: 'userNotFound',
                    message: 'User Not Found'
                })
            } else {
                userId = userExists._id
                if (userExists.password) {
                    // check password
                    const passwordCorrect = await bcrypt.compare(password, userExists.password)
                    if (!passwordCorrect) {
                        errors.push({
                            label: 'wrongCred',
                            message: 'Wrong Credentials'
                        })
                    }
                }
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                error: errors
            })
        }

        // log the user in
        const token = jwt.sign({
            user: userId,
        }, process.env.JWT_PRIVATE_KEY)

        // send the token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
        }).send()

    } catch (error) {
        console.error("Error Creating User", error);
        return res.status(500).json({
            success: false,
            message: "Error Creating User",
            error: error.message
        });
    }
}

export const logoutCtrl = async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0)
        }).send()

    } catch (error) {
        console.error("Error logout", error);
        return res.status(500).json({
            success: false,
            message: "Error in logout",
            error: error.message
        });
    }
}

export const loggedInCtrl = async (req, res) => {
    try {
        const token = req.cookies.token
        if (!token) return res.json(false)

        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
        const userId = decoded.user
        res.json({ loggedIn: true, userId })
    } catch (error) {
        res.json({ loggedIn: false })
    }
}