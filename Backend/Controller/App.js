import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Stripe from 'stripe'
import Item from '../Model/QuickSearchesSchema.js'
import Login from '../Model/Login.js'
import Restaurant from '../Model/restaurants.js'
import Order from '../Model/Order.js'

const mongoUrl = "mongodb+srv://ap597672:DwjxAKatg7Wm5RT6@cluster0.af1ke.mongodb.net/Zomato?retryWrites=true&w=majority&appName=Cluster0";
const port = process.env.PORT || 3000;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_51PfGPoLyuYPCk0brxtM1exqBFm1lN8IJ3ioETn6QGH9ALFr7qfo9T3dBbe3KapoansVwUgSVAt3xk2G5jswNWXoJ005VZikr5G');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server running on port:${port}`)
})

mongoose.connect(mongoUrl).then(() => {
  console.log('Connected to MongoDB')
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message)
})


app.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    try {
      // Check if user already exists
      const existingUser = await Login.findOne({ email });
      if (existingUser) {
        return res.status(400).send({ message: 'User already exists' });
      }
      if (password !== confirmPassword) {
        return res.status(400).send({ message: 'Passwords do not match' });
      }
      if(password.length < 8) {
        return res.status(400).send({ message: 'Password must be at least 8 characters long' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create a new user
      const newUser = new Login({ firstName, lastName, email, password: hashedPassword });
      await newUser.save();

      const token = jwt.sign({ email }, process.env.SECRET_TOKEN || "token", { expiresIn: '1h' });

      res.status(201).json({ token, user: firstName, message: 'User registered successfully.' });
    } catch (error) {
      console.error('Error signing up:', error);
      res.status(500).send({ message: 'Error signing up', error: error.message });
    }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Login.findOne({ email });
    
    // Check if user exists and password is correct
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email }, process.env.SECRET_TOKEN || "token", { expiresIn: '1h' });
        res.json({ token: token, user: user.firstName });
    } else {
        res.status(401).json({ error: 'Incorrect email or password' });
    }
  } catch (err) {
      res.status(400).json({ error: err.message });
  }
})

app.post('/order', async (req, res) => {
  const { userName, name, itemLocation, orderedFood, subTotal } = req.body;
  let newOrder;

  try {
    // Create a new order
    newOrder = new Order({
      userName,
      name,
      itemLocation,
      orderedFood,
      subTotal
    });

    await newOrder.save();

    // Create a Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'Food Order',
            },
            unit_amount: subTotal * 100, // Convert to the smallest currency unit
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:5173/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `http://localhost:5173/verify?success=false&orderId=${newOrder._id}`,
    });

    res.status(201).json({ success: true, session_url: session.url });
  } catch (error) {
    if (newOrder) {
      await Order.findByIdAndDelete(newOrder._id);
    }
    res.status(500).json({ success: false, message: "Error creating order or session" });
  }
});

app.get('/order/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order details' });
  }
});

app.delete('/order/:orderId', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order' });
  }
});

app.get('/getRestaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurants', error });
  }
});

app.get('/getItems', async (req, res) => {
    try {
        const items = await Item.find();
        res.send(items);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching items', error });
    }
})

