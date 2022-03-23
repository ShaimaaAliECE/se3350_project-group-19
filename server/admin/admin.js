let homeButton = document.getElementById('home');
let logOutButton = document.getElementById('log-out');
let levelNumInput = document.getElementById('level-num');
let levelStatsButton = document.getElementById('stats-by-level');
let fullTableButton = document.getElementById('get-full-table');
let fetchStatus = document.getElementById('data-fetch-status');
let dataContainer = document.getElementById('data-container');

homeButton.addEventListener('click', () => {window.location.assign('/')});
logOutButton.addEventListener('click', () => {window.location.assign('/log-out')});
levelStatsButton.addEventListener('click', fetchLevelStats);
fullTableButton.addEventListener('click', fetchData);

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
<table class="data-table centered">
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

function fetchLevelStats(){
    let req = new XMLHttpRequest();
    req.open('get', `/stats-by-level?level=${levelNumInput.value}`, true);
    req.onreadystatechange = displayLevelStats;
    req.send();
}

function displayLevelStats(){
    if (this.readyState == 4){
        if (this.status == 503){
            fetchStatus.innerText = 'Unable to fetch data (Server database functions are disabled)';
        }
        else if (this.status == 500){
            fetchStatus.innerText = 'Unable to fetch data (Database error)';
        }
        else{
            let res = JSON.parse(this.responseText);
            console.log(res.data);
            dataContainer.innerHTML = generateLevelStatsDisplay(res.data);
        }
    }
}

function generateLevelStatsDisplay(data){
    let html = `\
    <h3 class='page-heading'>Total entries: ${data.count}</h3>
<div class='flex-container'>    
    <div class='flex-item box'>
        <h3 class='page-heading'>Algorithms</h3>
        ${generateAlgorithmsTable(data.countPerAlgorithm)}
    </div>
    <div class='flex-item box'>
        <h3 class='page-heading'>Mistakes</h3>
        <p>Completion rate: ${formatPercentage(data.completionRate)}</p>
        <p>Average mistakes: ${data.avgMistakes.toFixed(2)}</p>
        ${generateMistakesTable(data.countByMistakes)}
    </div>
    <div class='flex-item box'>
        <h3 class='page-heading'>Time</h3>
        <p>Minimum time: ${data.timeStats.min}</p>
        <p>Maximum time: ${data.timeStats.max}</p>
        <p>Average time: ${data.timeStats.avg}</p>
    </div>
</div>`;
    return html;
}

function generateAlgorithmsTable(data){
    let html = `\
<table class='data-table centered'>
    <tr>
        <th>Algorithm</th>
        <th>Entries</th>
    </tr>
`;
    for (let i in data){
        html += `<tr>
        <td>${i}</td>
        <td>${data[i]}</td>
</tr>`;
    }
    html += `\
</table>`;
    return html;
}

function formatPercentage(p){
    p *= 100;
    return p.toFixed(2) + '%';
}

function generateMistakesTable(data){
    let html = `\
<table class='data-table centered'>
    <tr>
        <th>Mistakes</th>
        <th>Entries</th>
    </tr>
`;
    for (let i = 0; i < data.length; i++){
        html += `<tr>
        <td>${i}</td>
        <td>${data[i] ? data[i] : 0}</td>
</tr>`;
    }
    html += `\
</table>`;
    return html;
}