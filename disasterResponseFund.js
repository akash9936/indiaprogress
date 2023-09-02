const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

// Rest of your code remains the same

const app = express();
const port = 3000;

// Set up your API endpoint URL
const apiUrl = 'https://api.data.gov.in/resource/6a0cfec4-df79-4c1e-90ba-b8eecb495c4d?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json';

// Serve your static HTML and JavaScript files
app.use(express.static('public'));
app.use(cors());

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
        const response = await fetch(apiUrl, { headers });
        
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
