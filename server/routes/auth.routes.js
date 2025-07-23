const express = require('express');
const r = express.Router();
const session = require('express-session');
const passport = require('passport');

// Session Middleware (must be before Passport)
r.use(session({
  secret: process.env.JWT_SECRET || 'a_very_secret_key',
  resave: false,
  saveUninitialized: false,
}));

r.use(passport.initialize());
r.use(passport.session());

r.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// 2. The callback route that Google redirects to
r.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }), // Redirect to a login page on failure
  (req, res) => {
    // On successful authentication, redirect to your frontend.
    // You might want to redirect to a dashboard or profile page.
    res.redirect(`${process.env.CLIENT_URL || 'http://localhost:3000'}/auth`);
  }
);

r.post('/logout', (req, res, next) => {
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

r.get('/profile', ensureAuthenticated, (req, res) => {
  res.json(req.user); // The user data is available thanks to the session
});

module.exports = r;