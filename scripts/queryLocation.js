/**
 * Query OpenCharge Map API
 * Query Response returns nearest charging station
*/
function displayChargingStations(response) {
  // Get the unordered list element with the id of "charge-list"
  let list = document.getElementById("charge-list");

  // Clear the list of any existing list items
  while (list.firstChild) {
        list.removeChild(list.firstChild);
  }

  // Loop through the response
  // For each charging station, create a list item with the address of the station
  for (let i = 0; i < response.length; i++) {
    
    // From the Response object, get the address of the station
    let address=response[i].AddressInfo.AddressLine1;

    // Create a list item node
    let listItem = document.createElement('li');
    listItem.innerText=address;
    // node.appendChild(document.createTextNode(address));
    list.appendChild(listItem);
    
    // Log the address of the charging station
    console.log(address);

  }
}

/**
 * Query OpenCharge Map API for charging stations near Sacramento City College
 *  All functions that use the await keyword must be called with the async keyword
 * This tells the JavaScript engine that the function is asynchronous
 */
async function sendApiRequest(){
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  /**
   * Perform a GET request to the OpenCharge Map API to get the list of charging stations
   */
  var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
  };

  // Construct the URL for the API request
  let countrycode="US";
  let maxresults="10";
  let compact="true";
  let verbose="false";
  let latitude="38.53939381460709";
  let longitude="-121.49176271808206";
  
  // Replace the following with your own API key
  let key = "f2925b08-bb25-4daf-b2d3-2330d385bb64"

  // Make an API request to OpenChargeMap API
  /**
   * We use a try catch since the API may be down and we want to handle this "gracefully"
   */
  try{
    // Request with the URL constructed above and the request options
    // await for the response to be fetched from the OpenChargeMap API
    let request = await fetch(`https://api.openchargemap.io/v3/poi/?output=json&countrycode=${countrycode}}&maxresults=${maxresults}&compact=${compact}&verbose=${verbose}&latitude=${latitude}&longitude=${longitude}&key=${key}`, requestOptions);
    // Convert the response to JSON
    let response = await request.json();
    // Display the charging stations on the web page
    displayChargingStations(response);
  }
  catch(error){
    console.log(error);
  }
}

// Get the button element with the id of "charge-button"
let queryBtn = document.getElementById('charge-btn')

// Add an event listener to the button and trigger the sendApiRequest function when clicked
queryBtn.addEventListener('click', sendApiRequest);