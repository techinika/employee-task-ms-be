const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// In a real application, you would store the hashed password in a database
const hashedPassword = bcrypt.hashSync('password123', 10);

app.post('/login', (req, res) => {
  const { password } = req.body;

  // Compare the user input password to the hashed password
  const passwordMatch = bcrypt.compareSync(password, hashedPassword);

  if (passwordMatch) {
    res.send('Login successful');
  } else {
    res.send('Login failed');
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
