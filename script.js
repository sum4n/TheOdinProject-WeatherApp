const img = document.querySelector('img');

async function getWeather(city='london') {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=4704dbc56dc3141d2a18ac4fcd685c15`);
    let weatherData = await response.json();
    // console.log(weatherData);
    console.log(processJSONData(weatherData));
    img.src = `http://openweathermap.org/img/wn/${processJSONData(weatherData).weatherIcon}@2x.png`;
    return processJSONData(weatherData);
}

getWeather();

function processJSONData(data) {
    const coordLon = data.coord.lon;
    const coordLat = data.coord.lat;
    const weather1 = data.weather[0].main;
    const weather2 = data.weather[0].description;
    const weatherIcon = data.weather[0].icon;
    const mainTemp = data.main.temp
    const mainHumidity = data.main.humidity;
    const visibility = data.visibility;
    const windSpeed = data.wind.speed;
    const windDirection = data.wind.deg;
    const dt = data.dt;
    const sys = data.sys.country;
    const cityName = data.name;
    
    return({coordLon, coordLat, weather1, weather2, mainTemp, mainHumidity, visibility, windSpeed, windDirection, dt, sys, cityName, weatherIcon});
}

