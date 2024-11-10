// html geolocation

let message = document.getElementById("thingMessage");
let thing = document.getElementById("thingTitle");
let dist = document.getElementById("thingDist");
let image = document.getElementById("thingImage");


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    message.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  // x.innerHTML = "Latitude: " + position.coords.latitude +
  //   "<br>Longitude: " + position.coords.longitude;
  const currentCoords = position.coords.latitude + "|" + position.coords.longitude;

  // geosearch api

  let url = "https://en.wikipedia.org/w/api.php";

  const params = {
    action: "query",
    list: "geosearch",
    gscoord: currentCoords,
    gsradius: "2000",
    gslimit: "1",
    gssort: "distance",
    format: "json"
  };

  url = url + "?origin=*";
  Object.keys(params).forEach(function (key) { url += "&" + key + "=" + params[key]; });

  fetch(url)
    .then(function (response) { return response.json(); })
    .then(function (response) {
      var pages = response.query.geosearch;

      for (var place in pages) {
        message.innerText = "The most interesting place near you is"
        thing.innerHTML = pages[place].title
        dist.innerHTML = pages[place].dist + "meters away"
        image.src = "https://picsum.photos/seed/" + Math.floor(Math.random() * 100) + "/200/200";
        image.style = "display: block;"

      }

    })
    .catch(function (error) { console.log(error); });

}