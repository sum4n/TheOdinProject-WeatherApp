const cityName = document.getElementById('cityInput');
const img = document.querySelector('img');
const form = document.querySelector('form');

const country = document.getElementById('location');
const countryImg = document.getElementById('countryImg');
const condition = document.getElementById('condition');
const temperature = document.getElementById('temperature');
const wind = document.getElementById('wind');
const clouds = document.getElementById('clouds');
const hpa = document.getElementById('hpa');
const coord = document.getElementById('coord');

const errorLocation = document.getElementById('errorLocation');


function writeToDom(data){
    country.textContent = `${data.cityName}, ${data.countryName}`;
    countryImg.src = `https://openweathermap.org/images/flags/${data.countryName.toLowerCase()}.png`;
    condition.textContent = data.condition;
    temperature.textContent = `${data.temp}°С`;
    wind.textContent = `wind ${data.windSpeed} m/s,`;
    clouds.textContent = `clouds ${data.clouds} %,`;
    hpa.textContent = `${data.hpa} hpa`;
    coord.textContent = `[ ${data.coord.lat}, ${data.coord.lon} ]`;
    errorLocation.textContent = '';
}

function deleteDomData(){
    country.textContent = '';
    countryImg.src = '';
    condition.textContent = '';
    temperature.textContent = '';
    wind.textContent = '';
    clouds.textContent = '';
    hpa.textContent = '';
    coord.textContent = '';
    img.src = '';
}

form.addEventListener('submit', () => {
    getWeather(cityName.value);
    cityName.value = '';
});

async function getWeather(city='london') {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=4704dbc56dc3141d2a18ac4fcd685c15&units=metric`);
        // console.log(response.status);

        if (response.status === 404) {
            console.log(response.status);
            errorLocation.textContent = "Location not found";
            deleteDomData();
            return;
        }

        let weatherData = await response.json();

        img.src = `http://openweathermap.org/img/wn/${processJSONData(weatherData).weatherIcon}@2x.png`;

        let processedData = processJSONData(weatherData);
        // console.log(processedData);
        writeToDom(processedData);
    } catch (error) {
        console.log(error);
    }
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

