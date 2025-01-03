const getWeather = async () => {
   try {
     // Replace with an actual API endpoint
     const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current_weather=true');
     if (!response.ok) {
       throw new Error(`HTTP error! Status: ${response.status}`);
     }
     const data = await response.json();
     console.log(data);
   } catch (error) {
     console.error("Error fetching weather data:", error);
   }
 };
 
 getWeather();
 