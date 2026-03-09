const button = document.getElementById("loadBtn");
const output = document.getElementById("output");

button.addEventListener("click", loadData);

// Why do we use async/await?
// async/await allows asynchronous operations like API requests
// to be written in a clear and readable way.

async function loadData(){

output.innerHTML = "Loading...";

try{

const response = await fetch("https://jsonplaceholder.typicode.com/users/1");

// Why do we check response.ok?
// response.ok checks if the HTTP request was successful.

if(!response.ok){
throw new Error("Network response was not ok");
}

const data = await response.json();

output.innerHTML = `
<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Company:</strong> ${data.company.name}</p>
`;

}

catch(error){

// Why do we use try/catch?
// try/catch helps handle errors such as network problems
// and prevents the program from crashing.

output.innerHTML = "Error loading data";

console.error(error);

}

}
