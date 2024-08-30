import express from 'express';
import mongoose from 'mongoose';
import crypto from 'crypto';

// Generate a secure session secret
const sessionSecret = crypto.randomBytes(64).toString('hex');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const mongoURI = '#';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Define the User schema and model
const userSchema = new mongoose.Schema({
  fullName: String,
  username: String,
  email: String,
  password: String,
  cart: Array, // Add cart field
});

const User = mongoose.model('User', userSchema);

// Define a POST route to register a new user
app.post('/register', async (req, res) => {
  const { fullName, username, email, password, confirmPassword } = req.body;

  // Simple validation check
  if (!fullName || !username || !email || !password || !confirmPassword) {
    return res.status(400).send('All fields are required.');
  }

  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match.');
  }

  // Create a new user instance
  const newUser = new User({
    fullName,
    username,
    email,
    password,
    cart: [] 
  });

  try {
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (err) {
    res.status(500).send('Error registering user: ' + err.message);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
