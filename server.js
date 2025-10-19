const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Init Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json({ limit: '10mb' })); // Allow us to accept large JSON (for selfie images)

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/inventory', require('./routes/inventory'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/time-clock-logs', require('./routes/timeClockLogs'));
app.use('/api/sales-reports', require('./routes/salesReports'));

app.get('/', (req, res) => res.send('QuantumERP API Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
