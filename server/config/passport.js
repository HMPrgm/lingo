// server/config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('../db'); // Import the PostgreSQL pool

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    const googleId = profile.id;
    const email = profile.emails[0].value;

    try {
      // Check if user exists in the database
      const result = await pool.query('SELECT * FROM users WHERE google_id = $1', [googleId]);

      if (result.rows.length > 0) {
        // User exists, return the user data
        return done(null, result.rows[0]);
      } else {
        // User does not exist, create a new user
        const newUserResult = await pool.query(
          'INSERT INTO users (google_id, email) VALUES ($1, $2) RETURNING *',
          [googleId, email]
        );
        return done(null, newUserResult.rows[0]);
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
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    done(null, result.rows[0]);
  } catch (err) {
    done(err);
  }
});