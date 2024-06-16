async function generateAPI(city) {
    const apiKey = 'fd60dce2c8b6f3d402bb839ff1a312ab';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw !new Error("Ой, місто не знайдено!");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return { error: error.message };
    }
}

function getEmoji(description) {
    if (description.includes("cloud")) {
        return "☁️";
    } else if (description.includes("rain")) {
        return "🌧️";
    } else if (description.includes("snow")) {
        return "☀️";
    } else if (description.includes("clear")) {
        return "❄️";
    } else {
        return "🌡️";
    }
}

async function getWeather() {
    const cityInput = document.getElementById('city').value;
    const weatherData = await generateAPI(cityInput);

    if (weatherData.error) {
        document.getElementById('nextCity').innerHTML = weatherData.error;
        return;
    }
    document.getElementById('cityName').innerHTML = weatherData.name;
    document.getElementById('temperature').innerHTML = `${weatherData.main.temp}°C`;
    document.getElementById('humidity').innerHTML = `Вологість: ${weatherData.main.humidity}%`;
    document.getElementById('cloud').innerHTML = `${weatherData.clouds.all}% Хмарність`;

    const weatherEmoji = getEmoji(weatherData.weather[0].description);

    document.getElementById('emoji').innerHTML = weatherEmoji;
    document.getElementById('nextCity').innerHTML = '';
}

