import API_KEY from './api.js';

const apiKey = API_KEY;

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weather-card'); // Div
const cityNameEl = document.getElementById('cityName');
const tempEl = document.getElementById('temp');
const tempElF = document.getElementById('temp-f');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');
const messageEl = document.getElementById('message');

const maxC = document.getElementById('max-c');
const minC = document.getElementById('min-c');

const maxF = document.getElementById('max-f');
const minF = document.getElementById('min-f');

function displayWeather(data) {
  cityNameEl.textContent = `${data.location.name}, ${data.location.country}`;
  tempEl.textContent = data.current.temp_c;
  tempElF.textContent = data.current.temp_f;
  humidityEl.textContent = data.current.humidity;
  windEl.textContent = data.current.wind_kph;
  maxC.textContent = data.forecast.forecastday[0].day.maxtemp_c;
  minC.textContent = data.forecast.forecastday[0].day.mintemp_c;
  maxF.textContent = data.forecast.forecastday[0].day.maxtemp_f;
  minF.textContent = data.forecast.forecastday[0].day.mintemp_c;
  const weatherIconEl = document.getElementById('weatherIcon');
  const condition = data.current.condition.text.toLowerCase();

  if (condition.includes('sun') || condition.includes('clear')) {
    weatherIconEl.src = 'images/sunny.png';
  } else if (condition.includes('cloud')) {
    weatherIconEl.src = 'images/cloudy.png';
  } else if (condition.includes('rain') || condition.includes('drizzle')) {
    weatherIconEl.src = 'images/rainy.png';
  } else if (condition.includes('snow')) {
    weatherIconEl.src = 'images/snowy.png';
  }
}

async function fetchWeather(city) {
  weatherInfo.classList.add('hidden');
  messageEl.textContent = 'Loading...';

  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}`,
    );
    if (!res.ok) throw new Error('City not found');

    const data = await res.json();
    displayWeather(data);
    messageEl.textContent = '';
    weatherInfo.classList.remove('hidden');
  } catch (error) {
    messageEl.textContent = error.message;
  }
}

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    messageEl.textContent = 'Please enter a city name.';
  }
});
