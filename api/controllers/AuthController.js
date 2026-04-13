import user from "../models/user.js"
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js"


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        // 1️⃣ Validate input
        if (!email || !password) {
            console.log(`${email},${password} not avilable`)
            return res.status(400).json({ message: "All fields are required" })
        }

        // 2️⃣ Find user
        const User = await user.findOne({ email })

        if (!User) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        // 3️⃣ Compare password
        const isMatch = await bcrypt.compare(password, User.password)

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        // 4️⃣ Generate token
        const token = generateToken(User._id, User.isAdmin)

        // 5️⃣ Send response
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: User._id,
                name: User.name,
                email: User.email
            }
        })

    } catch (error) {
        console.log("LOGIN ERROR:", error); // 🔥 ADD THIS
        res.status(500).json({ message: error.message });
    }
}




export const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const existingUser = await user.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const User = await user.create({
            name,
            email,
            password
        })

        // ✅ FIXED
        const token = generateToken(User._id)

        res.status(201).json({
            message: "User created successfully",
            token,
            user: {
                id: User._id,
                name: User.name,
                email: User.email
            }
        })

    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}
export const getUserProfile = async (req, res) => {
    try {
        const User = await user
            .findById(req.user.id)
            .select("-password")

        if (!User) {
            return res.status(404).json({ message: "User not found" })
        }

        res.json(User)

    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}
