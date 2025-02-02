import dotenv from "dotenv";
import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

// Load environment variables
dotenv.config();

// Generate OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

// Signup Controller
let tempUsers = new Map();  // Temporary storage for user data

export const signup = async (req, res) => {
    try {
        const { userName, email, password, adminType } = req.body;

        if (!userName || !email || !password || !adminType) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.status(400).json({ error: "User with same email already exists" });
        }

        // Generate OTP
        const otp = generateOTP();

        // Send OTP email
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        console.log(otp);
        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Your OTP for Signup",
                html: `<h2>Welcome!</h2>
                       <p>Your OTP for signup is: <strong>${otp}</strong></p>
                       <p>If you didn't request this OTP, please ignore this email.</p>`,
            });
        } catch (error) {
            console.error("Error in sending OTP:", error);
            return res.status(500).json({ error: "Failed to send OTP email" });
        }

        // Hash the password before storing it temporarily
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Store user details in memory
        tempUsers.set(email, { userName, email, password: hashedPassword, otp, adminType });

        return res.status(200).json({
            message: "OTP sent to your email. Please verify to complete signup.",
        });
    } catch (error) {
        console.error("Error in signup:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// OTP Verification Controller
export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ error: "Email and OTP are required" });
        }

        // Check if email exists in temporary storage
        const tempUser = tempUsers.get(email);
        if (!tempUser) {
            return res.status(404).json({ error: "User not found or OTP expired" });
        }

        if (tempUser.otp !== parseInt(otp)) {
            return res.status(400).json({ error: "Invalid OTP" });
        }

        // Create user after successful verification
        const newUser = new User({
            userName: tempUser.userName,
            email: tempUser.email,
            password: tempUser.password,
            isVerified: true,
            adminType: tempUser.adminType
        });

        await newUser.save();

        // Remove the user from temporary storage
        tempUsers.delete(email);

        return res.status(200).json({ message: "Email verified successfully, user created!" });
    } catch (error) {
        console.error("Error in verifyOTP:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


// Login Controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res.status(404).json({ message: "User not found." });
        }

        const isPasswordCorrect = await bcrypt.compare(password, checkUser.password || "");
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: checkUser._id }, process.env.MY_SECRET, { expiresIn: "1h" });

        // Send token in response, do NOT use localStorage in backend
        return res.status(200).json({ 
            message: "Login successful!", 
            token, 
            user: { id: checkUser._id, email: checkUser.email } 
        });
    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};