const API_KEY = "368c646199ed46c46b08bced54349719";

export async function getMoviesByGenreAndPage(genre, page) {
  const url = genre
    ? `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genre}}`
    : `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&page=${page}&sort_by=popularity.desc`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function searchMoviesByNameAndPage(searchQuery, page) {
  const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
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

export async function getPlayingNowMovies() {
  const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${encodeURIComponent(
    API_KEY
  )}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getTrailerByIdAndType(movieId, type) {
  const url = `https://api.themoviedb.org/3/${type}/${encodeURIComponent(
    movieId
  )}/videos?api_key=${encodeURIComponent(API_KEY)}&language=en-US`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
