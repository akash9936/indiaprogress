import React, { useState } from 'react';

function App() {
  const [projectData, setProjectData] = useState(null);

  const handleButtonClick = () => {
    // Make an API call here, for example using fetch
    fetch('/disasterResponseFund')
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        setProjectData(data);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error:', error);
      });
  };

  return (
    <div className="App">
      {/* Your other JSX content here */}
      <button id="projectButton" onClick={handleButtonClick}>
        State-wise Allocation and Release of Funds under State Disaster Response Fund during 2022-23
      </button>
      {/* Render project data or error message */}
      {projectData ? (
        <pre>{JSON.stringify(projectData, null, 2)}</pre>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default App;
