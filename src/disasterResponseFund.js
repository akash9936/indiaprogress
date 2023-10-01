//main URL: https://data.gov.in/resource/current-daily-price-various-commodities-various-markets-mandi


const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
// Rest of your code remains the same

const app = express();
const port = 2000;

// Set up your API endpoint URL
const govtUrl = process.env.GOVT_URL;
 //const baseUrl= process.env.NODE_ENV=="development" ? process.env.DEV_API_URL : process.env.DEV_API_URL;
 app.use(express.static('public'));
 app.use(cors());
// Serve your static HTML and JavaScript files


// Define a route to handle the button click and fetch data
app.get('/getProjectData', async (req, res) => {
    try {
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
    console.log(`Server is listening on port ${port}`);
});
