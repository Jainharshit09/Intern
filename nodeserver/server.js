import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import crypto from 'crypto';
// Generate a secure session secret
const sessionSecret = crypto.randomBytes(64).toString('hex');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:8080', // Replace with your frontend URL
    credentials: true // Enable credentials (cookies, authorization headers, etc.)
}));
// Define the Order schema and model directly in this file
const orderSchema = new mongoose.Schema({
  items: [
    {
      subject: String,
      price: Number,
      quantity: Number
    }
  ],
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);
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

// Session middleware configuration
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: mongoURI }),
    cookie: { maxAge: 30 * 60 * 1000 }, // Session expires after 30 minutes of inactivity
  })
);

// User schema and model
const userSchema = new mongoose.Schema({
  fullName: String,
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);
app.post('/api/orders', async (req, res) => {
  console.log(req.body); // Log the request body for debugging
  try {
    const { cartItems, cartTotal } = req.body;

    const order = new Order({
      items: cartItems,
      total: cartTotal
    });

    await order.save();

    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'An error occurred while placing the order' });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const { cartItems, cartTotal } = req.body;
    
    const order = new Order({
      items: cartItems,
      total: cartTotal
    });

    await order.save();

    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while placing the order' });
  }
});
// Route to handle user registration
app.post('/register', async (req, res) => {
    const { fullName, username, email, password, confirmPassword } = req.body;
    // Simple validation check
    if (!fullName || !username || !email || !password || !confirmPassword) {
      return res.status(400).json({error:'All fields are required.'});
    }
  
    if (password !== confirmPassword) {
      return res.status(400).json({error:'Passwords do not match.'});
    }
  
    // Create a new user instance
    const newUser = new User({
      fullName,
      username,
      email,
      password,  // In a real application, make sure to hash passwords before storing them!
    });
  
    try {
      await newUser.save();
      res.status(200).json({message:"Successfully registered user",user:newUser});
    } catch (err) {
      res.status(500).send('Error registering user: ' + err.message);
    }
});

// Route to handle user login and create session
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({error:'Invalid username or password'});
    }

    // Create session
    req.session.user = { id: user._id, username: user.username };
    res.json({ message: 'Login successful', user: req.session.user });
  } catch (err) {
    res.status(500).send({error:'Error logging in: ' + err.message});
  }
});

// Route to check if session is active
app.get('/session-check', (req, res) => {
  if (req.session.user) {
    res.json({ active: true, user: req.session.user });
  } else {
    res.json({ active: false });
  }
});

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.clearCookie('connect.sid'); // This clears the cookie used by the session
        res.sendStatus(200);
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
