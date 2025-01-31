const getWeather = async () => {
   try {
     // Replace with an actual API endpoint
     const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,precipitation,wind_speed_10m&hourly=temperature_2m'); 

// need to change the fetch url to the correct one, latitude and longitude are for Berlin, Germany

     if (!response.ok) {
       throw new Error(`HTTP error! Status: ${response.status}`);
     }
     const data = await response.json();
     console.log(data);

     // Extract relevant data
     const { temperature_2m, wind_speed_10m } = data.current;
     const cityName = "Berlin"; // You can replace this with dynamic city name if available

     // Update HTML elements
     document.getElementById('cityName').textContent = cityName;
     document.getElementById('currentWeather').textContent = `Temperature: ${temperature_2m}°C`;
     document.getElementById('temperature').textContent = `Temperature: ${temperature_2m}°C`;
     document.getElementById('windSpeed').textContent = `Wind Speed: ${wind_speed_10m} m/s`;

     // Make the weather display section visible
     document.getElementById('weather').style.display = 'block';

   } catch (error) {
     console.error("Error fetching weather data:", error);
   }
};

document.getElementById('weatherForm').addEventListener('submit', (event) => {
   event.preventDefault();
   getWeather();
});

const newElement = document.createElement('div');
newElement.id = 'weather';
newElement.classList.add('p-3', 'border', 'rounded');
newElement.style.display = 'none';
document.body.appendChild(newElement);

const currentWeather = document.createElement('p');
currentWeather.id = 'currentWeather';
newElement.appendChild(currentWeather);

const temperature = document.createElement('p');
temperature.id = 'temperature';
newElement.appendChild(temperature);

const windSpeed = document.createElement('p');
windSpeed.id = 'windSpeed';
newElement.appendChild(windSpeed);

const h3 = document.createElement('h3');
h3.textContent = 'Weather in ';
newElement.appendChild(h3);

const cityName = document.createElement('p');
cityName.id = 'cityName';
newElement.appendChild(cityName);