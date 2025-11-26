const API_KEY = 'a01cd372'
const BASE_URL = 'https://www.omdbapi.com/' // CORREGIDO


export async function getMovies(movie) {
  try {
    const response = await fetch(`${BASE_URL}?s=${movie}&apikey=${API_KEY}`)
    const data = await response.json()

    if (data.Response === 'True') {
      return {
        success: true,
        movies: data.Search
      }
    } else {
      return {
        success: false,
        error: '<p>No se encontraron peliculas</p>'
      }
    }

  } catch (error) {
    console.error('Error al buscar peliculas:', error)
    return {
      success: false,
      error: '<p>Error al cargar</p>'
    }
  }
}


export async function getMovieDetails(imdbId) {
  try {
    const response = await fetch(`${BASE_URL}?i=${imdbId}&apikey=${API_KEY}`)
    const data = await response.json()

    if (data.Response === 'True') {
      return {
        success: true,
        details: data
      }
    } else {
      return {
        success: false,
        error: '<p>No se encontraron detalles</p>'
      }
    }

  } catch (error) {
    console.error('Error buscando detalles:', error)
    return {
      success: false,
      error: '<p>Error al cargar</p>'
    }
  }
}
