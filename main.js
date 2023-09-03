

document.addEventListener('DOMContentLoaded', () => {
    const projectButton = document.getElementById('projectButton');
    const projectDataDiv = document.getElementById('projectData');

    projectButton.addEventListener('click', () => {
        // Make an HTTP GET request to your Node.js server
     //   const baseUrl= process.env.NODE_ENV=="  " ? "" : 'http://localhost:3000/getProjectData';
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
    // Function to display project data in the UI as a bar chart
    function displayProjectData(data, targetElement) {
        targetElement.innerHTML = '';

        const preElement = document.createElement('pre');
        preElement.textContent = JSON.stringify(data, null, 2);

        // Append the <pre> element to the target
        targetElement.appendChild(preElement);

    }
});
