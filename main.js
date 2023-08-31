document.addEventListener('DOMContentLoaded', () => {
    const projectButton = document.getElementById('projectButton');
    const projectDataDiv = document.getElementById('projectData');

    // Replace this URL with your actual API endpoint
    const apiUrl = 'https://api.data.gov.in/resource/6a0cfec4-df79-4c1e-90ba-b8eecb495c4d?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json';

    projectButton.addEventListener('click', () => {
        // Set up the headers for the request
        const headers = new Headers({
            'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'Connection': 'keep-alive',
            // ... (other headers)
        });
        

        // Make the API request using the fetch API
        fetch(apiUrl, { headers })
            .then(response => response.json())
            .then(data => {
                // Handle the API response data
                displayProjectData(data, projectDataDiv);
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });
    });

    // Function to display project data in the UI
    function displayProjectData(data, targetElement) {
        // Clear previous data
        targetElement.innerHTML = '';

        // Create a new <pre> element to display the JSON data
        const preElement = document.createElement('pre');
        preElement.textContent = JSON.stringify(data, null, 2);

        // Append the <pre> element to the target
        targetElement.appendChild(preElement);
    }
});


// Replace this URL with your actual API endpoint
const apiUrl = 'https://api.data.gov.in/resource/6a0cfec4-df79-4c1e-90ba-b8eecb495c4d?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json';

// Set up the headers for the request
const headers = new Headers({
    'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'Connection': 'keep-alive',
    'DNT': '1',
    'Origin': 'https://data.gov.in',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-site',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
    'accept': 'application/xml',
    'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
});

// Make the API request using the fetch API
fetch(apiUrl, { headers })
    .then(response => response.json())
    .then(data => {
        // Handle the API response data here
        console.log(data);
    })
    .catch(error => {
        // Handle errors here
        console.error('Error:', error);
    });
