// server.js
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Allow server to accept JSON data in request body

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// A simple test route
app.get('/', (req, res) => {
  res.send('<h1>Hello from MERN Todo Backend</h1>');
});

const todoRoutes = require('./routes/todos');
app.use('/api/todos', todoRoutes); // All routes in todos.js will be prefixed with /api/todos

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});