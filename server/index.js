require('dotenv').config();
require('./config/passport'); // Import your passport configuration
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');


const app = express();
const port = 8080;
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
};

// Session Middleware (must be before Passport)
app.use(session({
  secret: process.env.JWT_SECRET || 'a_very_secret_key',
  resave: false,
  saveUninitialized: false,
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cors(corsOptions));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// 2. The callback route that Google redirects to
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }), // Redirect to a login page on failure
  (req, res) => {
    // On successful authentication, redirect to your frontend.
    // You might want to redirect to a dashboard or profile page.
    res.redirect(`${process.env.CLIENT_URL || 'http://localhost:3000'}/auth`);
  }
);

app.post('/auth/logout', (req, res, next) => {
  // req.logout() is a Passport function that removes the req.user property
  // and clears the login session.
  req.logout(function(err) {
    if (err) {
      // If there's an error during logout, pass it to the next error handler.
      return next(err);
    }
    // On successful logout, send a success message.
    // The session cookie will be cleared by Passport.
    res.status(200).json({ message: 'Logout successful' });
  });
});

// --- Protecting a Route ---
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
}

app.get('/auth/profile', ensureAuthenticated, (req, res) => {
  res.json(req.user); // The user data is available thanks to the session
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Lingo backend!' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});