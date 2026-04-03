import bcrypt from "bcryptjs"
import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },

        password: {
            type: String,
            required: true
        },

        phone: {
            type: String
        },

        isAdmin: {
            type: Boolean,
            default: false
        },

        addresses: [
            {
                street: String,
                city: String,
                state: String,
                postalCode: String,
                country: String
            }
        ],

        cart: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product"
                },
                quantity: Number
            }
        ]
    },
    { timestamps: true }
)

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return 
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    
})

export default mongoose.model("user", userSchema, "users");

