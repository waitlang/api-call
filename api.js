// html geolocation

let x = document.getElementById("demo");


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
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
    gsradius: "10000",
    gslimit: "10",
    format: "json"
  };

  url = url + "?origin=*";
  Object.keys(params).forEach(function (key) { url += "&" + key + "=" + params[key]; });

  fetch(url)
    .then(function (response) { return response.json(); })
    .then(function (response) {
      var pages = response.query.geosearch;
      console.log(pages)
      for (var place in pages) {
        listTitle.innerText = "WOW LOOK AT ALL THESE INTERESTING PLACES! YOU'VE GOT"
        // console.log(pages[place].title);
        let li = document.createElement('li');
            li.innerText = pages[place].title
            x.appendChild(li);
        // x.innerHTML = pages[place].title
      }
    })
    .catch(function (error) { console.log(error); });
  // console.log(pages) 

}