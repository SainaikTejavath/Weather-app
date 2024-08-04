document.getElementById('weather-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const city = document.getElementById('city-input').value;
    fetchWeather(city);
});

async function fetchWeather(city) {
    const apiKey = '04ad5b255b342dc6fd5d0f430a0f7be3';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        console.log(`Fetching weather data from URL: ${url}`);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API response:', data);

        if (data && data.weather && data.weather.length > 0) {
            const { temp } = data.main;
            const { description, icon } = data.weather[0];
            document.getElementById('weather-info').innerHTML = `
                <h2>Weather in ${data.name}, ${data.sys.country}</h2>
                <p>Condition: ${description}</p>
                <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}">
                <p>Temperature: ${temp}°C</p>
            `;
        } else {
            document.getElementById('weather-info').innerHTML = `<p>No weather data available for the specified location.</p>`;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weather-info').innerHTML = `<p>Unable to fetch weather data. Please try again later.</p>`;
    }
}
