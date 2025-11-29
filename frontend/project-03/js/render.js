import { getMovieDetails } from "./api.js"
import { addFavoriteMovie } from "./favorites.js"



const movieInformation = document.getElementById('movieInformation')

export function renderMovie(movies) {
  movieInformation.innerHTML = ''

  movies.forEach((movie) => {
    const div = document.createElement('div')
    div.innerHTML = `
    <p class='title-year'>${movie.Title} - ${movie.Year}</p>
    <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/80x120?text=No+Image'}" width="80"/>
    <button class='favBtn'>ADD TO FAVORITES</button>
    <button class='detailsBtn'>SEE DETAILS</button>
    `
    movieInformation.appendChild(div)

    div.querySelector('.favBtn').addEventListener('click', () => addFavoriteMovie(movie))

    div.querySelector('.detailsBtn').addEventListener('click', async () => {
      const result = await getMovieDetails(movie.imdbID)

      if(result.success) {
        renderMovieDetails(result.details)
      } else {
        movieInformation.innerHTML = result.error
      }
    })
  })
  
}

function renderMovieDetails(detail) {
  movieInformation.innerHTML = ''

  movieInformation.innerHTML = ` 

    <h2>${detail.Title} (${detail.Year})</h2>
    <img src="${detail.Poster !== 'N/A' ? detail.Poster : 'https://via.placeholder.com/150x200?text=No+Image'}" width="150"/>
    <p><strong>Language:</strong> ${detail.Language}</p>
    <p><strong>Director:</strong> ${detail.Director}</p>
    <p><strong>Actors:</strong> ${detail.Actors}</p>
    <p><strong>Plot:</strong> ${detail.Plot}</p>
  `;
}