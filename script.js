const weatherForm = document.getElementById('weatherForm');
const weatherDisplay = document.getElementById('weather');
const loading = document.getElementById('loading');
const API_KEY = '250acdc360fef654243d71fe20c7e6e2';

const getWeather = async (city) => {
    try {
        loading.style.display = 'block';
        weatherDisplay.style.opacity = '0';
        weatherDisplay.style.display = 'block';

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        
        if (!response.ok) {
            throw new Error(`City not found or API error! Status: ${response.status}`);
        }

        const data = await response.json();
        const { name, main, weather, wind } = data;
        const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

        document.getElementById('cityName').textContent = name;
        document.getElementById('weatherIcon').src = iconUrl;
        document.getElementById('description').textContent = weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1);
        document.getElementById('temperature').textContent = `${main.temp}°C`;
        document.getElementById('humidity').textContent = `${main.humidity}%`;
        document.getElementById('windSpeed').textContent = `${wind.speed} m/s`;

        loading.style.display = 'none';
        setTimeout(() => {
            weatherDisplay.style.opacity = '1';
            weatherDisplay.style.transform = 'scale(1)';
        }, 100);

    } catch (error) {
        console.error("Error fetching weather data:", error);
        loading.style.display = 'none';
        weatherDisplay.innerHTML = '<p class="error"><i class="fas fa-exclamation-triangle"></i> Couldn’t find that city. Try again!</p>';
        weatherDisplay.style.opacity = '1';
    }
};

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const city = document.getElementById('city').value.trim();
    if (city) {
        getWeather(city);
    }
});