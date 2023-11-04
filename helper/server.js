const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose'); // Import Mongoose
const DisasterResponseFund = require('./DisasterResponseFund'); // Import your Mongoose model
dotenv.config();

const app = express();
const port = 54321;

// Set up your API endpoint URL
const govtUrl = process.env.GOVT_URL;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(express.static('public'));
app.use(cors());

// Define a route to handle the button click and fetch data
app.get('/disasterResponseFund', async (req, res) => {
    try {
        const headers = {
            'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'Connection': 'keep-alive',
        };

        const response = await fetch(govtUrl, { headers });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Save the data to MongoDB
        await DisasterResponseFund.collection.insertMany(data.records);

        // Send the API response data as JSON
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching and saving data.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
