const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const professorsRoutes = require('./routes/professors'); // Import professors routes
const courseTypesRoutes = require('./routes/courseTypes'); // Import course types routes
const db = require('./db'); // Import database connection

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

// Routes
app.use('/professors', professorsRoutes);
app.use('/course-types', courseTypesRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
