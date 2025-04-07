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
  
function successCallback(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log(`Latitude: ${lat}, Longitude: ${lon}`);
}

function errorCallback(error) {
    console.error("Error getting location:", error);
} 

async function fetchWeatherData(){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=a8ce3afc4aa3d64978fa7929aaa7fd2a`);

        if(!response.ok){
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        const temp = data.current.temp;
        const humidity = data.current.humidity;
        const conditions = data.current.weather.main;
        const sunrise = data.current.sunrise;
        const sunset = data.current.sunset;

        document.getElementById("temp").innerHTML = temp + '°';
        document.getElementById("humidity").innerHTML = "Humidity: " + humidity;
        document.getElementById("conditions").innerHTML = conditions;
        document.getElementById("sunrise").innerHTML = "Sunrise: " + sunrise;
        document.getElementById.innerHTML = "Sunset " + sunset;

        console.log(sunrise);
        console.log(sunset);
        console.log(temp);
        console.log(humidity);
        console.log(weather);
    }
    catch(error){
        console.error(error);
        document.getElementById("temp").innerHTML = "Could not retrieve weather data, please try again later...";
    }
}

fetchWeatherData();