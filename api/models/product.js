import mongoose from "mongoose";
// import bcrypt from "bcryptjs"
// import mongoose from "mongoose"

// const userSchema = new mongoose.Schema(
//     {
//         name: {
//             type: String,
//             required: true
//         },

//         email: {
//             type: String,
//             required: true,
//             unique: true,
//             lowercase: true
//         },

//         password: {
//             type: String,
//             required: true
//         },

//         phone: {
//             type: String
//         },

//         isAdmin: {
//             type: Boolean,
//             default: false
//         },

//         addresses: [
//             {
//                 street: String,
//                 city: String,
//                 state: String,
//                 postalCode: String,
//                 country: String
//             }
//         ],

//         cart: [
//             {
//                 productId: {
//                     type: mongoose.Schema.Types.ObjectId,
//                     ref: "Product"
//                 },
//                 quantity: Number
//             }
//         ]
//     },
//     { timestamps: true }
// )

// userSchema.pre("save", async function () {
//     if (!this.isModified("password")) return
//     const salt = await bcrypt.genSalt(10)
//     this.password = await bcrypt.hash(this.password, salt)

// })

// export default mongoose.model("user", userSchema, "users");



const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    brand: {
        type: String,
    },
    unitsAvailable: {
        type: Number,
    },

    images: [
        {
            type: String,
            required: true
        }
    ],
    description: {
        type: String,
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiryDate: {
        type: Date,
        required: function () {
            return this.categoryType === "perishable";
        }
    }

},
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema, "items");

export default Product;