import mongoose from "mongoose"
import User from "../models/user.js"

await mongoose.connect("mongodb://localhost:27017/database1")

const Users = [
  {
    name: "Aman Verma",
    email: "aman.verma@example.com",
    password: "password123",
    phone: "9876543210",
    isAdmin: false,
    addresses: [
      {
        street: "221B Baker Street",
        city: "Delhi",
        state: "Delhi",
        postalCode: "110001",
        country: "India"
      }
    ],
    cart: []
  },

  {
    name: "Sara Khan",
    email: "sara.khan@example.com",
    password: "mypassword456",
    phone: "9123456780",
    isAdmin: false,
    addresses: [
      {
        street: "MG Road",
        city: "Mumbai",
        state: "Maharashtra",
        postalCode: "400001",
        country: "India"
      }
    ],
    cart: []
  },

  {
    name: "Aas mohd",
    email: "mraas0003@gmail.com",
    password: "Mr@Aas@0003",
    phone: "7500371250",
    isAdmin: true,
    addresses: [
      {
        street: "main road nalhera gaji",
        city: "saharanpur",
        state: "Uttar Pradesh",
        postalCode: "247001",
        country: "India"
      }
    ],
    cart: []
  }
]

for (let user of Users) {
  await User.create(user)
}

console.log("Users inserted!")
process.exit()