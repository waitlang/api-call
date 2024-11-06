// html geolocation

const x = document.getElementById("demo");


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
  var y = position.coords.latitude + "|" + position.coords.longitude;
}

// geosearch api

var url = "https://en.wikipedia.org/w/api.php"; 

var params = {
    action: "query",
    list: "geosearch",
    gscoord: y,
    gsradius: "10000",
    gslimit: "10",
    format: "json"
};

url = url + "?origin=*";
Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

fetch(url)
    .then(function(response){return response.json();})
    .then(function(response) {
        var pages = response.query.geosearch;
        for (var place in pages) {
            console.log(pages[place].title);
        }
    })
    .catch(function(error){console.log(error);});