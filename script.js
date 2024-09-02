// Define the API key as a constant
const API_KEY = '89fe0687e373734ce9eee0cf2e8f806e';

// Define the base URL for the OpenWeatherMap API
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Function to get the weather data
function getWeather() {
  // Get the city value from the input field
  const city = document.getElementById('city').value.trim();

  // Check if the city input is empty
  if (!city) {
    alert('Please enter a city');
    return;
  }

  // Construct the API URLs for current weather and forecast
  const currentWeatherUrl = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const forecastUrl = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;

  // Call the functions to fetch the current weather and hourly forecast
  fetchCurrentWeather(currentWeatherUrl);
  fetchHourlyForecast(forecastUrl);
}

// Function to fetch the current weather data
function fetchCurrentWeather(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => displayWeather(data))
    .catch(error => {
      console.error('Error fetching current weather data:', error);
      alert('Error fetching current weather data. Please try again.');
    });
}


// Function to fetch the hourly forecast data
function fetchHourlyForecast(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => displayHourlyForecast(data.list))
    .catch(error => {
      console.error('Error fetching hourly forecast data:', error);
      alert('Error fetching hourly forecast data. Please try again.');
    });
}

// Function to display the current weather data
function displayWeather(data) {
  const tempDivInfo = document.getElementById('temp-div');
  const weatherInfoDiv = document.getElementById('weather-info');
  const weatherIcon = document.getElementById('weather-icon');
  const hourlyForecastDiv = document.getElementById('hourly-forecast');

  // Clear previous content
  weatherInfoDiv.innerHTML = '';
  hourlyForecastDiv.innerHTML = '';
  tempDivInfo.innerHTML = '';

  if (data.cod === '404') {
    weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
  } else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    const temperatureHTML = `
      <p>${temperature}ºC</p>
    `;

    const weatherHTML = `
      <p>${cityName}</p>
      <p>${description}</p>
    `;

    tempDivInfo.innerHTML = temperatureHTML;
    weatherInfoDiv.innerHTML = weatherHTML;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;

    showImage();
  }
}

// Function to display the hourly forecast data
function displayHourlyForecast(hourlyData) {
  const hourlyForecastDiv = document.getElementById('hourly-forecast');
  const next24Hours = hourlyData.slice(0, 8);

  // Use a more efficient way to create the hourly forecast HTML
  const hourlyForecastHTML = next24Hours.map(item => {
    const dateTime = new Date(item.dt * 1000);
    const hour = dateTime.getHours();
    const temperature = Math.round(item.main.temp);
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    return `
      <div class="hourly-item">
        <span>${hour}:00</span>
        <img src="${iconUrl}" alt="Hourly Weather Icon">
        <span>${temperature}ºC</span>
      </div>
    `;
  }).join('');

  hourlyForecastDiv.innerHTML = hourlyForecastHTML;
}

// Function to show the weather icon
function showImage() {
  const weatherIcon = document.getElementById('weather-icon');
  weatherIcon.style.display = 'block';
}
;