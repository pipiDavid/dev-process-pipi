const searchMovie = document.getElementById('searchMovie')
const searchBtn = document.getElementById('searchBtn')
const information = document.getElementById('information')

let favoritesHistory = JSON.parse(localStorage.getItem('movieInfo')) || []

let movies = []

async function getMovies(movie) {
    try {
        const response = await fetch(`http://www.omdbapi.com/?s=${movie}&apikey=a01cd372`)
        const data = await response.json()
        movies = data.Search
        renderMovie(movies)

    } catch(error) {
      information.innerHTML = '<p>Error al cargar peliculas</p>'
    }

}
function addToFavorites(data) {
    const favoriteItem = {
        title: data.Title,
        year: data.Year
    }
    favoritesHistory = favoritesHistory.filter(item => item.title !== favoriteItem.title) 
        favoritesHistory.unshift(favoriteItem)
    
    localStorage.setItem('movieInfo', JSON.stringify(favoritesHistory))
}


function renderMovie(movies) {
    information.innerHTML = ''
    movies.forEach((movie) => {
        const div = document.createElement('div')
        div.innerHTML = `
        <p class='title'>${movie.Title}</p>
        <p class='year'>${movie.Year}</p>
        <img class='poster' src='${movie.Poster}'/>
        <button class='favBtn'>Add To Favorites</button>
        
        `
        information.appendChild(div)
        const favBtn = div.querySelector('.favBtn')
        favBtn.addEventListener('click', () => addToFavorites(movie))
    })
    
}

searchBtn.addEventListener('click', () => {
    const searchTerm = searchMovie.value.trim().toLowerCase()

    if(searchTerm === '') {
        information.innerHTML = '<p>error al cargar peliculas</p>'
        return
    }
    getMovies(searchTerm)
} )