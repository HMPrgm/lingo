// server/config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Your Mongoose User model

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    // This function is called after the user successfully authenticates with Google.
    // The 'profile' object contains their Google profile information.
    try {
      // Find a user in your database with this googleId
      let user = await User.findOne({ googleId: profile.id });

      if (user) {
        // If user exists, continue
        return done(null, user);
      } else {
        // If not, create a new user in your database
        const newUser = new User({
          googleId: profile.id,
          email: profile.emails[0].value,
          // You can add other fields like name from profile.displayName
        });
        await newUser.save();
        return done(null, newUser);
      }
    } catch (err) {
      return done(err);
    }
  }
));

// Stores the user ID in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Retrieves user details from the session using the ID
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});