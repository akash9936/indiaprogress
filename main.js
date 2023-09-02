

document.addEventListener('DOMContentLoaded', () => {
    const projectButton = document.getElementById('projectButton');
    const projectDataDiv = document.getElementById('projectData');

    projectButton.addEventListener('click', () => {
        // Make an HTTP GET request to your Node.js server
        fetch('http://localhost:3000/getProjectData') // Assuming this route is defined in your server.js
            .then(response => response.json())
            .then(data => {
                // Handle the response data
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
