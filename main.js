const api = {
    key:        "[ADD API KEY HERE]",
    base:    "https://api.openweathermap.org/data/2.5/"    
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode==13) {
        getResults(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&lang=de&appid=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
    
    let city = document.querySelector('.location .city');
    let now = new Date();
    let date = document.querySelector('.location .date');
    let temp = document.querySelector('.current .temp');
    let weather_icon = document.querySelector('.current .weather-icon');
    let weather_el = document.querySelector('.current .weather');
    let hilow = document.querySelector('.current .hi-low');
    let animation = document.querySelector('main');
    animation.classList.add('fade-in');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    date.innerText = dateBuilder(now);
    temp.innerHTML = `${Math.round(weather.main.temp)} <span>&deg; C </span>`;
    weather_icon.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    weather_el.innerText = weather.weather[0].description;
    hilow.innerText = `${Math.round(weather.main.temp_min)} ºC / ${Math.round(weather.main.temp_max)} ºC`;
}

function dateBuilder(d) {
    let months = ["Januar", "Februar", "März", "April", "May", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    let days = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date}. ${month} ${year}`;
}
