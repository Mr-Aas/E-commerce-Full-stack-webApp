import jwt from "jsonwebtoken"


export default function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
        return res.status(400).json({ message: "unautherized" })

    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        req.user = decoded;
        next()
    } catch {
        res.status(401).json({ message: "invalid token" })
    }
}