async function getWeather(city='london') {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=4704dbc56dc3141d2a18ac4fcd685c15`);
    let weatherData = await response.json();
    console.log(weatherData);
    return weatherData;
}

getWeather();