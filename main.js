//https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true
//https://www.trackcorona.live/api/countries


var request = new XMLHttpRequest();
request.open('GET', 'https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true', true);

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

request.onload = function() {
  var data = JSON.parse(this.response);

  var total_deceased = 0;
  var total_recovered = 0;
  var total_infected = 0;

  let table  = document.querySelector("table");


  for (var i = 0; i < data.length; i++) {
    if (typeof(data[i].deceased) === 'number') {
      total_deceased += data[i].deceased;
    }
    if (typeof(data[i].recovered) === 'number') {
      total_recovered += data[i].recovered;
    }
    if (typeof(data[i].infected) === 'number') {
      total_infected += data[i].infected;
    }

    

    var output = [data[i].country, data[i].infected, data[i].recovered, data[i].deceased];

    let row = table.insertRow();

    for (let j = 0; j < output.length; j++) {
      let cell = row.insertCell();
      let text = document.createTextNode(output[j]);
      cell.appendChild(text);
    }
    
    
  }

  
  console.log(formatNumber(total_deceased));
  console.log(formatNumber(total_infected));
  console.log(formatNumber(total_recovered));

  document.querySelector("#confirmed").append(formatNumber(total_infected));
  document.querySelector("#recovered").append(formatNumber(total_recovered));
  document.querySelector("#deceased").append(formatNumber(total_deceased));
  
}

request.send();

/*function generateTableHead(table, data) {
  let tHead = table.createTHead();
  let row = tHead.insertRow();

  for (let key of data) {
    let th = document.createElement('th');
    let text = document.createTextNode(key);

    th.appendChild(text);
    row.appendChild(th);
  }
} */

function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();

    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}





  axios({
    method: 'get',
    url: 'https://www.trackcorona.live/api/countries',

  })
  .then(res => {
    let d = res.data;
    for (let i =0; i < res.d.length; i++) {
      console.log(d[i].location);
    }
  })
  .catch(err => console.log(err));

