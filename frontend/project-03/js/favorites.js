export let favoriteHistory = JSON.parse(localStorage.getItem('movieInfo')) || []

export function addToFavMovie(data) {
  const favoriteItem = {
    title: data.Title,
    year: data.Year
  }

  favoriteHistory = favoriteHistory.filter(
    (item) => item.title !== favoriteItem.title
  )

  favoriteHistory.unshift(favoriteItem)

  localStorage.setItem('movieInfo', JSON.stringify(favoriteHistory))
}
