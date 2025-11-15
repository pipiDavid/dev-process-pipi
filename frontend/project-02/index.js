const searchCountry = document.getElementById('searchCountry')
const searchBtn = document.getElementById('searchBtn')
const weather = document.getElementById('weather')

const apiKey = "86254f4fbb446d010fca3459f33ad107"

let allWeather = JSON.parse(localStorage.getItem('weather')) || []

async function getWeather() {
    try {
        const city = 'London'
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        allWeather = await response.json()

        localStorage.setItem('weather', JSON.stringify(allWeather) )

    } catch(error) {
        weather.innerHTML = '<p>Error al cargar Clima</p>'

    }
}

function renderWeather(city) {
    weather.innerHTML = ''
    const p = document.createElement('p')
    p.textContent = `${city.name} - ${city.weather[0].description}`
    weather.appendChild(p)

}

searchBtn.addEventListener('click', () => {
    const searchTerm = searchCountry.value.toLowerCase()

    if(searchTerm === '') {
        weather.innerHTML = ''
        return
    }
    if(allWeather.name && allWeather.name.toLowerCase() === searchTerm) {
        renderWeather(allWeather)
    } else {
        weather.innerHTML = '<p>No se encontro esa ciudad</p>'
    }
})

getWeather()