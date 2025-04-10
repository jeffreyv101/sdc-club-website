// By default the latitude and longitude are set to the location of Liberty University
let lat = 37.3492;
let lon = 79.1784;

// Function to get the user's location
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
} else {
    // Geolocation is not supported by this browser
    console.log("Geolocation is not supported by this browser.");
}
  
// Function to handle the success case when getting the user's location
// This function is called when the user's location is successfully retrieved
function successCallback(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log(`Latitude: ${lat}, Longitude: ${lon}`);
    fetchWeatherData();
}

// Function to handle errors when getting the user's location
// This function is called if the user denies permission to access their location
function errorCallback(error) {
    console.error("Error getting location:", error);
    fetchWeatherData();
} 

/*
Notes on using fetch vs XMLHttpRequest:
1. Fetch was easier to implement and its abstraction of what is going on under the hood made it much easier to utilize.
2. XMLHttpRequest was fairly barebones and required an understanding of how HTTP server works in order to troubleshoot and utilize.
3. Both accomplish the same thing from what I can tell and it really depends on how much abstraction the developer is willing to have on the code.
*/
async function fetchWeatherData(){
    try{
        // Using the latitude and longitude retrieved by the user (or just using Liberty University), fetch from the OpenWeatherMap API
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a8ce3afc4aa3d64978fa7929aaa7fd2a`);

        // Check if the response is ok (status code 200)
        // If not, throw an error
        if(!response.ok){
            throw new Error("Could not fetch resource");
        }

        // Parse the JSON response
        const data = await response.json();
        console.log(data);
        const temp = Math.ceil((data.main.temp - 273.15) * 9/5 + 32);
        const humidity = data.main.humidity;
        const conditions = data.weather[0].main;
        
        // Convert sunrise and sunset times to local time
        // Note: The times are in UTC, so we need to convert them to the local time zone
        // Using 'America/New_York' as the timezone for Liberty University
        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('default', {timeZone: 'America/New_York'});
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('default', {timeZone: 'America/New_York'});

        // Update the HTML elements with the weather data (also add unique CSS styling)
        if (temp > 80) {
            document.getElementById("temp").style.backgroundColor = "#f26843";
        }
        else if (temp > 60 && temp <= 80) {
            document.getElementById("temp").style.backgroundColor = "#2deb40";
        }
        else {
            document.getElementById("temp").style.backgroundColor = "#2debeb";
        }

        // Show the results to the page
        document.getElementById("temp").innerHTML = temp + '°';
        document.getElementById("humidity").innerHTML = "Humidity: " + humidity + '%';
        document.getElementById("conditions").innerHTML = "Current Conditions: " + conditions;
        document.getElementById("sunrise").innerHTML = "Sunrise: " + sunrise;
        document.getElementById("sunset").innerHTML = "Sunset: " + sunset;
    }
    catch(error){
        console.error(error);
        document.getElementById("temp").innerHTML = "Could not retrieve weather data, please try again later...";
    }
}

// Get a fun fact about cats (using an XMLHttpRequest)
// Example code used from https://www.w3schools.com/xml/xml_http.asp and https://javascript.info/xmlhttprequest
function getCatFunFact() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        // If the request was successful
        if (this.readyState == 4 && this.status == 200) {
            const data = JSON.parse(xhttp.responseText);

            document.getElementById("cat-fact").innerHTML = data.fact;
        }
        else if (this.readyState == 4) {
            console.error("Cat fact ready state: " + this.readyState);
            console.error("Cat fact status: " + this.status);

            document.getElementById("cat-fact").innerHTML = "Sorry something went wrong, please try again later...";
        }
    };

    xhttp.open("GET", "https://catfact.ninja/fact", true);
    xhttp.send();
}