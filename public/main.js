document.addEventListener('DOMContentLoaded', () => {
    const projectButton = document.getElementById('projectButton');
    const projectDataDiv = document.getElementById('projectData');
    const dataTableBody = document.querySelector('#dataTable tbody');
    const nextPageButton = document.getElementById('nextPageButton');
    const prevPageButton = document.getElementById('prevPageButton');
    const currentPageElement = document.getElementById('currentPage');
    let currentPage = 1;

    const FarmersMarketHubButton = document.getElementById('farmersMarketHubButton');
    const FarmersMarketHubDataDiv = document.getElementById('farmersMarketHubData');
    const farmersMarketHubdataTableBody = document.querySelector('#farmersMarketHubdataTable tbody');
    const farmersMarketHubfilterButton = document.getElementById('farmersMarketHubfilterButton');
    projectButton.addEventListener('click', () => {
        // Make an HTTP GET request to your Node.js server
        fetch('http://localhost:4000/getProjectData') // Assuming this route is defined in your server.js
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

    FarmersMarketHubButton.addEventListener('click', () => {
        // Make an HTTP GET request to your Node.js server
        let stateFilter = document.getElementById('stateFilter').value;
        let districtFilter = document.getElementById('districtFilter').value;
        let apiUrl = `http://localhost:2000/farmersMarketHub?page=${currentPage}`;
        // Add stateFilter to the URL if it's provided
        if (stateFilter) {
            apiUrl += `&state=${stateFilter}`;
        }
        // Add districtFilter to the URL if it's provided
        if (districtFilter) {
            apiUrl += `&district=${districtFilter}`;
        }

        //api call
        fetch(`http://localhost:2000/farmersMarketHub?page=${currentPage}&state=${stateFilter}&district=${districtFilter}`) // Assuming this route is defined in your server.js
            .then(response => response.json())
            .then(data => {
                // Handle the response data
                displayProjectDataV2(data, farmersMarketHubdataTableBody);
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });
    });
    farmersMarketHubfilterButton.addEventListener('click', () => {
        // Make an HTTP GET request to your Node.js server
        const stateFilter = document.getElementById('stateFilter').value;
        const districtFilter = document.getElementById('districtFilter').value;

        fetch(`http://localhost:2000/farmersMarketHub?state=${stateFilter}&district=${districtFilter}`) // Assuming this route is defined in your server.js
            .then(response => response.json())
            .then(data => {
                // Handle the response data
                displayProjectDataV2(data, farmersMarketHubdataTableBody);
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });
    });
    // Next page button click event
    nextPageButton.addEventListener('click', () => {
        console.log('Next button clicked');
        currentPage += 1;
        currentPageElement.textContent = currentPage;
        FarmersMarketHubButton.click(); // Trigger the API request
    });

    // Previous page button click event
    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage -= 1;
            currentPageElement.textContent = currentPage;
            FarmersMarketHubButton.click(); // Trigger the API request
        }
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