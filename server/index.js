const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('./config/passport'); // Import your passport configuration

const app = express();
const port = 8080;
const corsOptions = {
  origin: 'http://localhost:3000', 
};

// Session Middleware (must be before Passport)
app.use(session({
  secret: 'a_very_secret_key', // Change this to an environment variable
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
    res.redirect('/profile');
  }
);

// --- Protecting a Route ---
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
}

app.get('/profile', ensureAuthenticated, (req, res) => {
  res.json(req.user); // The user data is available thanks to the session
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Lingo backend!' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});