const searchCity = document.getElementById('searchCity')
const searchBtn = document.getElementById('searchBtn')
const information = document.getElementById('information')
const apiKey = '86254f4fbb446d010fca3459f33ad107'

let searchHistory = JSON.parse(localStorage.getItem('weatherHistory')) || []

function getWeatherIcon(mainWeather) {
    switch (mainWeather) {
        case 'Clear':
            return './icons/sun.png'
            break;
        case 'Clouds':
            return './icons/cloudy.png'
            break;
        case 'Rain':
            return './icons/rain.png'
            break;
        case 'Thunderstorm':
            return './icons/thunderstorm.png'
            break;
        case 'Snow':
            return './icons/snow.png'
            break;
    }
}


async function getCityWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        const data = await response.json()
        addToHistory(data)
        renderTheInfo(data)

    } catch (error) {
        information.innerHTML = '<p>Not found any City</p>'
    }

}

function addToHistory(data) {
    const historyItem = {
        name: data.name,
        country: data.sys.country,
        weather: data.weather[0].description,
        temp: Math.round(data.main.temp),
        humidity: data.main.humidity,
        wind: data.wind.speed
    }
    searchHistory = searchHistory.filter(item => item.name !== historyItem.name)
    searchHistory.unshift(historyItem)
    if (searchHistory.length > 5) {
        searchHistory = searchHistory.slice(0, 5)
    }
    localStorage.setItem('weatherHistory', JSON.stringify(searchHistory))
}

function renderTheInfo(data) {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('es-ES', {
        weekday: 'short',
        month: 'long',
        day: '2-digit'
    })
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const icon = getWeatherIcon(data.weather[0].main)

    const dayName = now.toLocaleDateString('es-ES', {
        weekday: 'long'
    })
    information.innerHTML = `
    <div class='info-card'>

    <div class='top-section'>
    <p class='date'>${formattedDate}</p>
    <p class='time'>${formattedTime}</p>
    <p class='city'>${data.name}, ${data.sys.country}</p>

    </div>

    <div class='middle-section'>
    <img class='icon' src='${icon}'>
    <p class='temp'>${Math.round(data.main.temp)}°</p>
    <p class='dayName'>${dayName}</p>
    
    </div>
    
    </div>
`

}

searchBtn.addEventListener('click', () => {
    const searchTerm = searchCity.value.trim().toLowerCase()

    if (searchTerm === '') {
        information.innerHTML = '<p>Enter a City, Please</p>'
        return
    }
    getCityWeather(searchTerm)
})