const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const DisasterResponseFund = require('../helper/models/disasterResponseFundModels');
dotenv.config();

const app = express();
const port = 54321;

// Set up your API endpoint URL
const govtUrl = process.env.GOVT_URL;
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
    bufferTimeoutMS: 5000
};


app.use(express.static('public'));
app.use(cors());

// Define a route to handle the button click and fetch data
app.get('/disasterResponseFund', async (req, res) => {
    try {


        await mongoose.connect(process.env.MONGODB_URI, mongooseOptions);
        const db = await mongoose.connection;

        db.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        db.once('open', () => {
            console.log('Connected to MongoDB');
        });
        // Set up the headers for the request
        const headers = {
            'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'Connection': 'keep-alive',
            // ... (other headers)
        };

        // Make the API request using the fetch API
        const response = await fetch(govtUrl, { headers });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const disasterResponseFund = new DisasterResponseFund({
            title: data.title,
            desc: data.desc,
            created_date: data.created_date,
            source: data.source,
            org_type: data.org_type,
            records: data.records, // Assuming the structure matches your schema
        });
        const disasterResponseFundArray = [disasterResponseFund];

        await DisasterResponseFund.collection.insertMany(disasterResponseFundArray);

        // Send the API response data as JSON
        res.json(data);
    } catch (error) {
        // Handle errors and send an error response
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});

app.get('/farmersMarketHub', async (req, res) => {
    try {
        const stateFilter = req.query.state;
        const districtFilter = req.query.district;
        const commodityFilter = req.query.commodity;
        const marketFilter = req.query.market;
        let updatedUrl = null;
        let page = parseInt(req.query.page) || 1;
        let pageSize = parseInt(req.query.pageSize) || 10;
        let offset = (page - 1) * pageSize;
        updatedUrl = govtUrl + `&offset=${offset}&limit=${pageSize}`;
        if (stateFilter) {
            updatedUrl = `${updatedUrl}&filters%5Bstate%5D=${stateFilter}`;
        }
        if (districtFilter) {
            updatedUrl = `${updatedUrl}&filters%5Bdistrict%5D=${String(districtFilter)}`;
        }
        if (commodityFilter) {
            updatedUrl = `${updatedUrl}&filters%5Bcommodity%5D=${String(commodityFilter)}`;
        }
        if (marketFilter) {
            updatedUrl = `${updatedUrl}&filters%5Bmarket%5D=${String(marketFilter)}`;
        }

        // Set up the headers for the request
        const headers = {
            'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'Connection': 'keep-alive',
            // ... (other headers)
        };

        // Make the API request using the fetch API
        const response = await fetch(updatedUrl, { headers });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Send the API response data as JSON
        res.json(data);
    } catch (error) {
        // Handle errors and send an error response
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching dataa.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
