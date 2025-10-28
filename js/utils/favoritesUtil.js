export function handleFavorite(media) {
  const stored = localStorage.getItem("favorites");
  let favorites = stored ? JSON.parse(stored) : [];

  if (favorites.some((fav) => fav.id == media.id)) {
    const updatedFavorites = favorites.filter((fav) => fav.id != media.id);

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    return;
  }
  favorites.push(media);
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

export function isFavorite(movieId) {
  const stored = localStorage.getItem("favorites");
  const favorites = stored ? JSON.parse(stored) : [];

  return favorites.some((fav) => fav.id == movieId);
}
