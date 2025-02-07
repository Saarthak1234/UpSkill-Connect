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
// let tempUsers = new Map();  // Temporary storage for user data

export const signup = async (req, res) => {
    try {
        const { userName, email, password, adminType } = req.body;

        if (!userName || !email || !password || !adminType) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User with this email already exists" });
        }

        // Generate OTP
        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 minutes

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user with OTP
        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
            adminType,
            isUserVerified: false,
            otp,
            otpExpires
        });

        await newUser.save();

        // Send OTP via email
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        console.log(otp); // For debugging, remove in production
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP for Signup",
            html: `<h2>Welcome!</h2>
                   <p>Your OTP for signup is: <strong>${otp}</strong></p>
                   <p>It will expire in 5 minutes. If you didn't request this OTP, please ignore this email.</p>`,
        });

        return res.status(200).json({ message: "OTP sent to your email. Please verify to complete signup." });

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

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found or OTP expired" });
        }

        // Check OTP validity
        if (user.otp !== parseInt(otp) || new Date() > user.otpExpires) {
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }

        // Update user as verified and remove OTP
        user.isUserVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        return res.status(200).json({ message: "Email verified successfully, user activated!" });

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

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Ensure user is verified
        if (!user.isUserVerified) {
            return res.status(403).json({ message: "Please verify your email before logging in." });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password || "");
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: user._id }, process.env.MY_SECRET, { expiresIn: "1h" });

        return res.status(200).json({ 
            message: "Login successful!", 
            token, 
            user: { id: user._id, email: user.email } 
        });

    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
