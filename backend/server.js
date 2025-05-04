require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const authRoutes = require('./routes/authRoutes');


app.use(cors());
app.use(express.json()); 
// Request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connected'))
  .catch((err) => console.error('Error connecting to database:', err));

// Route handlers
app.use('/api/auth', authRoutes);



// Server listener
const PORT = process.env.PORT || 5000; // Port fallback for flexibility
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

