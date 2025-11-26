import { getMovies } from "./api.js"
import { renderMovie } from "./render.js"
import { debounce, isValidSearchText } from "./utils.js"

const movieInput = document.getElementById('movieInput')
const searchBtn = document.getElementById('searchBtn')
const movieInformation = document.getElementById('movieInformation')

async function searchMovie() {
  const movie = movieInput.value.trim()

  if (!isValidSearchText(movie)) {
    movieInformation.innerHTML = "<p>Ingrese un texto válido</p>"
    return
  }

  const result = await getMovies(movie)

  if (result.success) {
    renderMovie(result.movies)
  } else {
    movieInformation.innerHTML = result.error
  }
}

searchBtn.addEventListener("click", searchMovie)

movieInput.addEventListener("input", debounce(searchMovie, 600))
