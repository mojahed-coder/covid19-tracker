//https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true
//https://www.trackcorona.live/api/countries


var request = new XMLHttpRequest();
request.open('GET', 'https://www.trackcorona.live/api/countries', true);

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

request.onload = function() {
  var data = JSON.parse(this.response);

  var total_death = 0;
  var total_recovered = 0;
  var total_confirmed = 0;

  let table  = document.querySelector("table");
console.log(data.data.length);
  
  for (let i = 0; i < data.data.length; i++) {
    total_confirmed += data.data[i].confirmed;
    total_recovered += data.data[i].recovered;
    total_death += data.data[i].dead;
    console.log("country: ", i);
   
    var output = [data.data[i].location, data.data[i].confirmed, data.data[i].recovered, data.data[i].dead];

    let row = table.insertRow();

    for (let j = 0; j < output.length; j++) {
      let cell = row.insertCell();
      let text = document.createTextNode(output[j]);
      cell.appendChild(text);
    }
    
    
  }

 console.log(total_confirmed);

  document.querySelector("#confirmed").append(formatNumber(total_confirmed));
  document.querySelector("#recovered").append(formatNumber(total_recovered));
  document.querySelector("#deceased").append(formatNumber(total_death));
  
  
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




/*
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
*/
