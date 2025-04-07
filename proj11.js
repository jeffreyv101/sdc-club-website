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

async function fetchWeatherData(){
    try{
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

        // Update the HTML elements with the weather data
        if (temp > 80) {
            document.getElementById("temp").style.backgroundColor = "#f26843";
        }
        else if (temp > 60 && temp <= 80) {
            document.getElementById("temp").style.backgroundColor = "#2deb40";
        }
        else {
            document.getElementById("temp").style.backgroundColor = "#2debeb";
        }


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