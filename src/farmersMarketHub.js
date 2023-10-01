//https://data.gov.in/resource/current-daily-price-various-commodities-various-markets-mandi#api

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
// Rest of your code remains the same

const app = express();
//const port = process.env.DEV_API_URL || 3000;
const port = 2000;
// Set up your API endpoint URL
let Url = process.env.farmersMarketHub_URL;
//const baseUrl= process.env.NODE_ENV=="development" ? process.env.DEV_API_URL : process.env.DEV_API_URL;

// Serve your static HTML and JavaScript files
app.use(express.static('public'));
app.use(cors());

// Define a route to handle the button click and fetch data
app.get('/farmersMarketHub', async (req, res) => {
    try {

        const stateFilter = req?.query?.state;
        const districtFilter = req?.query?.district;
        const commodityFilter = req?.query?.commodity;
        const marketFilter = req?.query?.market;
        let updatedUrl = null
        let page = parseInt(req.query.page) || 1;
        // Current page number, default is 1
        let pageSize = parseInt(req.query.pageSize) || 10;
        let offset = (page - 1) * pageSize;
      //  page = pageSize * 10; // Number of items per page, default is 10
        updatedUrl = Url + `&offset=${offset}&limit=${pageSize}`;
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
        //     const data = JSON.parse(data);
        const data = await response.json();

        // Send the API response data as JSON
        res.json(data);
    } catch (error) {
        // Handle errors and send an error response
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log("Base URL is "+Url)
    console.log(`Server is listening on port ${port}`);
});
