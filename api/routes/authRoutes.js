import express from "express"
const router = express.Router()
import authMiddleware from "../middleware/AuthMiddleware.js"
import { signupUser, loginUser, getUserProfile } from "../controllers/AuthController.js"
import rateLimit from "express-rate-limit"
import passport from "passport";

const authlimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 100 requests
    message: "Too many requests, try again later"
});


router.post("/login", authlimiter, loginUser)
router.post("/signup", authlimiter, signupUser)
router.get("/profile", authMiddleware, authlimiter, getUserProfile)
// router.get("/me", authMiddleware, async (req, res) => {
//     const user = await User.findById(req.user.id).select("-password");
//     res.json(user);
// });
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        prompt: "select_account"
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
        const { token } = req.user;
        res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
    }
);

/* FACEBOOK LOGIN */
router.get(
    "/facebook",
    passport.authenticate("facebook", {
        scope: ["email"]
    })
);

router.get(
    "/facebook/callback",
    passport.authenticate("facebook", { session: false }),
    (req, res) => {
        const { token } = req.user;
        res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
    }
);



export default router
