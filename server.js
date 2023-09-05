// /netlify-functions/getProjectData.js
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

exports.handler = async (event, context) => {
  try {
    // Set up the headers for the request
    const headers = {
      'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
      'Connection': 'keep-alive',
      // ... (other headers)
    };

    // Make the API request using the fetch API
    const response = await fetch(process.env.GOVT_URL, { headers });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred while fetching data.' }),
    };
  }
};
