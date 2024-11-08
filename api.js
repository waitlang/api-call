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
    prop: "pageimages",
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
      var images = response.query.pages
      console.log(pages)
      for (var place in pages) {
        listTitle.innerText = "The most interesting place is " + pages[place].dist + " meters away"
        // console.log(pages[place].title);
        let li = document.createElement('li');
            li.innerText = pages[place].title
            x.appendChild(li);
        // x.innerHTML = pages[place].title
        
      }
      for (var page in images) {
        console.log(pages[page].title + ": " + pages[page].thumbnail.source);
        let img = document.getElementById("thingImage");
        img.innerHTML = images[page].thumbnail.source
        console.log(images[page].thumbnail.source);
    }
    })
    .catch(function (error) { console.log(error); });
  // console.log(pages) 

}