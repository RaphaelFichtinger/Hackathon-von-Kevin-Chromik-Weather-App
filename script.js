

let API_key = `66939a5e03827016457326samab6435`;
async function searchCity() {

    let inputValue = document.getElementById("cityInput").value;
    let cityAPI = `https://geocode.maps.co/search?q=${inputValue}&api_key=${API_key}`;

    console.log(inputValue);
    
    let response = await fetch(cityAPI);
    let data = await response.json(); 
    console.log(data[0].display_name);
    console.log(data);

    let cityName = data[0].display_name;
    let lat = data[0].lat;
    let lon = data[0].lon;
    getWeatherInfo(lat, lon, cityName);
}


async function getWeatherInfo(lat, lon, cityName) {
    console.log(lat, lon);
    let api_url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin`;
    let response = await fetch(api_url);
    let data = await response.json(); 
    console.log(data);
    let temp = data.current.temperature_2m;
    let weatherCode = data.current.weather_code;
    let imageURL1 = chooseTitleImage(weatherCode);
    chooseTitleImage(weatherCode);
    console.log(weatherCode);

    for (let index = 1; index < data.daily.temperature_2m_min.length; index++) {
        const daymin = data.daily.temperature_2m_min[index];
        const daymax =  data.daily.temperature_2m_max[index];
        const date = data.daily.time[index];
        const weatherCode = data.daily.weather_code[index];
        let imageURL = chooseImage(weatherCode);
        document.getElementById(`sub-bottom-container${index}`).innerHTML = 
        `<p id="minmaxContainer">min. ${daymin}  °C<br>-<br> max. ${daymax} °C</p> <br> ${date}<br><br> <img id="grill-img" src="${imageURL}">`;
    }

    renderWeatherData(temp, cityName);
}

function renderWeatherData(temp, cityName, imageURL1) {
    console.log(temp, cityName);
    document.getElementById("cityName").innerHTML = `${cityName}`;
    document.getElementById("temp").innerHTML = `${temp} °C `;

}

function chooseImage(weatherCode) {
    if(weatherCode < 60) {
        return ("./assets/barbecue.png");
    } else {
        return ("./assets/no-fire.png");
    }
}

function chooseTitleImage(weatherCode) {
    if(weatherCode < 60) {
        let goodWeather = document.getElementById("container");
        goodWeather.classList.add("backgroundClass1");
    } else {
        let badWeather = document.getElementById("container");
        badWeather.classList.add("backgroundClass2");
    }
}

