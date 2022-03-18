// Query OpenCharge Map API
// Query Response returns nearest charging station

function displayChargingStations(response) {
  console.log(response);
}

function sendApiRequest(){
  const data = null;

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      displayChargingStations(this.responseText);
    }
  });
  
  xhr.open("GET", "https://api.openchargemap.io/v3/poi/?output=json&countrycode=US&maxresults=1&compact=true&verbose=false&latitude=38.658901&longitude=-121.506882&key=f2925b08-bb25-4daf-b2d3-2330d385bb64");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.send(data);
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

let queryBtn = document.getElementById('charge-btn').addEventListener('click', sendApiRequest);
//queryBtn.addEventListener('click', sendApiRequest);