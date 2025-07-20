
// API key to authenticate requests to OpenWeatherMap API
const apiKey = "ad8e74afd00005e10446f5d0b87fa1d1"; // Replace with your actual API Key

// Adding a click event listener to the button with id="searchBtn"
document.getElementById('searchBtn').addEventListener('click', () => {

  // Get the city name entered by the user, remove any leading/trailing spaces
  const city = document.getElementById('cityInput').value.trim();

  // If input is not empty, call getWeather function to fetch weather data
  if (city) {
    getWeather(city);
  }
});


// Function to fetch weather data from OpenWeatherMap API
function getWeather(city) {

  // Construct the API URL using template literals
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  // Send HTTP GET request using Fetch API
  fetch(url)
    .then(response => {

      // If API response status is not OK (200), throw an error
      if (!response.ok) throw new Error('City not found');

      // Parse the response body as JSON
      return response.json();
    })
    .then(data => {
      // Pass the weather data to displayWeather function for rendering
      displayWeather(data);
    })
    .catch(error => {
      // If any error occurs (network error or city not found), display error message
      document.getElementById('weatherResult').innerText = error.message;
    });
}


// Function to display weather data on the web page
function displayWeather(data) {

  // Destructure useful data from the API response object
  const { name, main, weather, wind } = data;

  // Create HTML content dynamically with the weather details
  const result = `
    <h2>${name}</h2>  <!-- Display City Name -->
    <p>${weather[0].description}</p>  <!-- Display Weather Description -->
    <p>Temperature: ${main.temp} °C</p>  <!-- Display Temperature -->
    <p>Humidity: ${main.humidity}%</p>  <!-- Display Humidity -->
    <p>Wind: ${wind.speed} km/h</p>  <!-- Display Wind Speed -->

    <!-- Display the entire 'main' object as JSON formatted text -->
    <pre> main object: ${JSON.stringify(main, null, 2)}</pre>
  `;

  // Inject the generated HTML into the element with id="weatherResult"
  document.getElementById('weatherResult').innerHTML = result;
}
