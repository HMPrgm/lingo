const express = require('express');
const cors = require('cors');

const app = express();
const port = 8080;
const corsOptions = {
  origin: 'http://localhost:3000', 
};

app.use(express.json());
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Lingo backend!' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});