document.addEventListener('DOMContentLoaded', () => {
    const projectButton = document.getElementById('projectButton');
    const projectDataDiv = document.getElementById('projectData');
    const dataTableBody = document.querySelector('#dataTable tbody');

    projectButton.addEventListener('click', () => {
        // Make an HTTP GET request to your Node.js server
        fetch('http://localhost:3000/getProjectData') // Assuming this route is defined in your server.js
            .then(response => response.json())
            .then(data => {
                // Handle the response data
                displayProjectDataV2(data, dataTableBody);
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });
    });


    function displayProjectDataV2(data, dataTableBody) {
        // Clear the existing table rows
        dataTableBody.innerHTML = '';
    
        // Create the table headers (thead)
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
    
        // Create table header cells for each field
        data.field.forEach(field => {
            const headerCell = document.createElement('th');
            headerCell.textContent = field.name;
            headerRow.appendChild(headerCell);
        });
    
        thead.appendChild(headerRow);
    
        // Append the thead to the table
        dataTableBody.appendChild(thead);
    
        // Create the table body (tbody) and populate it with data
        const tbody = document.createElement('tbody');
        data.records.forEach(record => {
            const row = document.createElement('tr');
    
            // Create table cells for each field
            data.field.forEach(field => {
                const cell = document.createElement('td');
                cell.textContent = record[field.id];
                row.appendChild(cell);
            });
    
            tbody.appendChild(row);
        });
    
        // Append the tbody to the table
        dataTableBody.appendChild(tbody);
    }
    
});
