let favoritesHistory = JSON.parse(localStorage.getItem('movieInfo')) || []

export function addFavoriteMovie(data) {
  const favoriteItem = {title: data.Title, year: data.Year}

  favoritesHistory = favoritesHistory.filter((item) => item.title !== favoriteItem.title)

  favoritesHistory.unshift(favoriteItem)

  localStorage.setItem('movieInfo', JSON.stringify(favoritesHistory))

}