import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

/* ================= GOOGLE ================= */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        // 🔍 Step 1: Find by Google ID
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // 🔍 Step 2: Find by email
          user = await User.findOne({ email });

          if (user) {
            // ✅ Link Google account
            user.googleId = profile.id;
            await user.save();
          } else {
            // ✅ Create new user
            user = await User.create({
              name: profile.displayName,
              email,
              googleId: profile.id,
              password: "oauth_dummy_password", // ⚠️ required for schema
            });
          }
        }

        const token = jwt.sign(
          { id: user._id, role: user.isAdmin ? "admin" : "user" },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );

        return done(null, { user, token });

      } catch (err) {
        return done(err, null);
      }
    }
  )
);

/* ================= FACEBOOK ================= */
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "emails"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email =
          profile.emails?.[0]?.value || `${profile.id}@facebook.com`;

        // 🔍 Step 1: Find by Facebook ID
        let user = await User.findOne({ facebookId: profile.id });

        if (!user) {
          // 🔍 Step 2: Find by email
          user = await User.findOne({ email });

          if (user) {
            // ✅ Link Facebook account
            user.facebookId = profile.id;
            await user.save();
          } else {
            // ✅ Create new user
            user = await User.create({
              name: profile.displayName,
              email,
              facebookId: profile.id,
              password: "oauth_dummy_password", // ⚠️ required
            });
          }
        }

        const token = jwt.sign(
          { id: user._id, role: user.isAdmin ? "admin" : "user" },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );

        return done(null, { user, token });

      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;