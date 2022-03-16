let homeButton = document.getElementById('home');
let logOutButton = document.getElementById('log-out');
let fetchStatus = document.getElementById('data-fetch-status');
let dataContainer = document.getElementById('data-container');

homeButton.addEventListener('click', () => {window.location.assign('/')});
logOutButton.addEventListener('click', () => {window.location.assign('/log-out')});

fetchData();

// Get data from DB
function fetchData(){
    let req = new XMLHttpRequest();
    req.open('get', '/get-all-data', true);
    req.onreadystatechange = displayData;
    req.send();
}


function displayData(){
    if (this.readyState == 4){
        if (this.status == 503){
            fetchStatus.innerText = 'Unable to fetch data (Server database functions are disabled)';
        }
        else if (this.status == 500){
            fetchStatus.innerText = 'Unable to fetch data (Database error)';
        }
        else{
            let res = JSON.parse(this.responseText);
            if (res.data.length > 0){
                fetchStatus.innerText = "Successfully fetched data";
                console.log(res.data);
                dataContainer.innerHTML = generateDataTable(res.data);
            }
            else{
                fetchStatus.innerText = "Unable to fetch data (Request was successful, no rows returned)";
            }
        }
    }
}

function generateDataTable(data){
    let html = `
<table id="data-table" class="centered">
    <tr>
        <th>Timestamp</th>
        <th>Level</th>
        <th>Algorithm</th>
        <th>Completed</th>
        <th>Mistakes</th>
        <th>Time Spent</th>
    </tr>`;
    
    for (let row of data){
        html += `
    <tr>
        <td>${formatTimestamp(row.entryTimestamp)}</td>
        <td>${row.levelNum}</td>
        <td>${row.sortAlgorithm}</td>
        <td>${row.levelCompleted ? 'Yes' : 'No'}</td>
        <td>${row.mistakesMade}</td>
        <td>${row.levelTime}</td>
    </tr>`;
    }
    html += `
</table>`;
    return html;
}

function formatTimestamp(timestamp){
    return timestamp.replace('T', ' ').replace('Z', '');
}