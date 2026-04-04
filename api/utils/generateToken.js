import jwt from "jsonwebtoken"

const generateToken = (userId, isAdmin) => {
  return jwt.sign(
    { id: userId, role: `${isAdmin ? "admin" : "user"}` },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  )
}

export default generateToken