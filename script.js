const cityName = document.getElementById('cityInput');
const img = document.querySelector('img');
const form = document.querySelector('form');

form.addEventListener('submit', () => {
    console.log(cityName.value);
    getWeather(cityName.value);
    cityName.value = '';
});

async function getWeather(city='london') {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=4704dbc56dc3141d2a18ac4fcd685c15&units=metric`);
    let weatherData = await response.json();
    // console.log(weatherData);
    console.log(processJSONData(weatherData));
    img.src = `http://openweathermap.org/img/wn/${processJSONData(weatherData).weatherIcon}@2x.png`;
    return processJSONData(weatherData);
}

getWeather();

function processJSONData(data) {
    const coord = data.coord;
    const weather1 = data.weather[0].main;
    const condition = data.weather[0].description;
    const weatherIcon = data.weather[0].icon;
    const temp = data.main.temp
    const mainHumidity = data.main.humidity;
    const visibility = data.visibility;
    const windSpeed = data.wind.speed;
    const windDirection = data.wind.deg;
    const dt = data.dt;
    const countryName = data.sys.country;
    const cityName = data.name;
    const clouds = data.clouds.all;
    const hpa = data.main.pressure;
    
    return({coord, weather1, condition, temp, mainHumidity, visibility, windSpeed, windDirection, dt, countryName, cityName, weatherIcon, clouds, hpa});
}

