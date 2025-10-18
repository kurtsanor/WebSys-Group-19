const API_KEY = "368c646199ed46c46b08bced54349719";

export async function getShowsByGenreAndPage(genre, page) {
  const url = genre
    ? `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genre}}`
    : `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&page=${page}&sort_by=popularity.desc`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function searchShowsByNameAndPage(searchQuery, page) {
  const searchUrl = `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(
    searchQuery
  )}&api_key=${encodeURIComponent(API_KEY)}&page=${page}`;

  try {
    const res = await fetch(searchUrl);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
