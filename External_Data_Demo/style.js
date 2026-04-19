// Adding event listener to the "Load Data" button
document.getElementById('loadDataBtn').addEventListener('click', loadData);

// Async function to load data
async function loadData() {
  // Display the loading message
  document.getElementById('loadingMessage').style.display = 'block';
  document.getElementById('dataContainer').style.display = 'none';
  document.getElementById('errorMessage').style.display = 'none';

  try {
    // Fetching data from the API
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');

    // Check if response is OK
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    // Parse the JSON response
    const data = await response.json();

    // Display the fetched data
    document.getElementById('name').textContent = 'Name: ' + data.name;
    document.getElementById('email').textContent = 'Email: ' + data.email;
    document.getElementById('company').textContent = 'Company: ' + data.company.name;

    // Hide the loading message and show the data
    document.getElementById('loadingMessage').style.display = 'none';
    document.getElementById('dataContainer').style.display = 'block';
  } catch (error) {
    // If an error occurs, display the error message
    document.getElementById('loadingMessage').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'block';
  }
}

// Code Comments:
// Why do we use async/await?
// Using async/await helps to work with promises and makes the code easier to read and write as synchronous code.
// It allows us to write asynchronous code that looks and behaves like synchronous code.

// Why do we check response.ok?
// response.ok checks if the response status is between 200-299. If it’s not in this range, we throw an error to handle it.

// Why do we use try/catch?
// try/catch is used to handle errors that may occur during the fetch operation or data processing. 
// If an error occurs, it is caught in the catch block, allowing us to handle it gracefully.
