require('dotenv').config();
require('./config/passport'); // Import your passport configuration
const express = require('express');
const cors = require('cors');



const app = express();
const port = 8080;
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
};



// Passport Middleware

app.use(express.json());
app.use(cors(corsOptions));

app.use('/auth', require('./routes/auth.routes'));
app.use('/articles', require('./routes/article.routes'));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Lingo backend!' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});