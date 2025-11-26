import { addToFavMovie } from "./favorites.js"
import { getMovieDetails } from "./api.js"

const movieInformation = document.getElementById('movieInformation')

export function renderMovie(movies) {
  movieInformation.innerHTML = ''

  movies.forEach(movie => {
    const div = document.createElement('div')

    div.innerHTML = `
      <p>${movie.Title} - ${movie.Year}</p>
      <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/80'}" />
      <button class="favBtn">Add to favorites</button>
      <button class="detailsBtn">See details</button>
    `

    movieInformation.appendChild(div)

    div.querySelector('.favBtn').addEventListener('click', () => {
      addToFavMovie(movie)
    })

    div.querySelector('.detailsBtn').addEventListener('click', async () => {
      const result = await getMovieDetails(movie.imdbID)

      if (result.success) {
        renderDetails(result.details)
      } else {
        movieInformation.innerHTML = result.error
      }
    })
  })
}


export function renderDetails(detail) {
  movieInformation.innerHTML = `
    <h2>${detail.Title} (${detail.Year})</h2>
    <img src="${detail.Poster !== 'N/A' ? detail.Poster : 'https://via.placeholder.com/150'}" width="150"/>
    <p><strong>Language:</strong> ${detail.Language}</p>
    <p><strong>Director:</strong> ${detail.Director}</p>
    <p><strong>Actors:</strong> ${detail.Actors}</p>
    <p><strong>Plot:</strong> ${detail.Plot}</p>
  `
}