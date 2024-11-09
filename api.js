// html geolocation

let x = document.getElementById("thingTitle");


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
        listTitle.innerText = "The most interesting place is " + pages[place].dist + " meters away"
        x.innerHTML = pages[place].title
        
      }

    })
    .catch(function (error) { console.log(error); });
  // console.log(pages) 

  // image geosearch 

  let img_url = "https://en.wikipedia.org/w/api.php";

  const img_params = {
    action: "query",
    generator: "geosearch",
    prop: "pageimages",
    gscoord: currentCoords,
    format: "json"
  };

  img_url = img_url + "?origin=*";
  Object.keys(img_params).forEach(function (key) { img_url += "&" + key + "=" + img_params[key]; });

  fetch(img_url)
    .then(function (response) { return response.json(); })
    .then(function (response) {
      var images = response.query.pages;
      for (var page in images) {
        let img = document.getElementById("thingImage");
        img.innerHTML = images[page]
        console.log(images[page].title + ": " + images[page].thumbnail.source);
        console.log("bayog")
      }
    })
    .catch(function (error) { console.log(error); });

}