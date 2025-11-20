const searchCity = document.getElementById('searchCity')
const searchBtn = document.getElementById('searchBtn')
const information = document.getElementById('information')
const apiKey = '86254f4fbb446d010fca3459f33ad107'

let searchHistory = JSON.parse(localStorage.getItem('weatherHistory')) || []

function selectIcon(weatherMain) {
    if(weatherMain === 'Clear') return "./icons/sun.pgn"
    if(weatherMain === 'Clouds') return "./icons/cloudy.png"
    if(weatherMain === 'Rain') return "./icons/rainy.png"
    if(weatherMain === "Thunderstorm") return "./icons/strom.png"
    if(weatherMain === 'Snow') return ".icons/snowflake.png"

    return "./icons/cloud.png"
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
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const icon = selectIcon(data.weather[0].description)

    const dayName = now.toLocaleDateString('es-ES', {
        weekday: 'long'
    })
    information.innerHTML = `
    <div class='info-card'>

    <p class='date'>${formattedDate}</p>
    <p class='time'>${formattedTime}</p>
    <p class= 'city'>${data.name}, ${data.sys.country}</p>
    <p class='icon'>${icon}</p>
    <p class='temp'>${data.main.temp}</p>
    <p class= 'dayName'>${dayName}</p>
   <p><strong>Humidity:</strong>${data.main.humidity}</p>
   <p><strong>Wind:</strong>${data.wind.speed}</p>
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