let API_KEY;

const configPromise = fetch("./config.json")
  .then((res) => res.json())
  .then((config) => {
    API_KEY = config.TMDB_API_KEY;
  });

export async function getMoviesByGenreAndPage(genre, page) {
  await configPromise;
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
  await configPromise;
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
  await configPromise;
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
  await configPromise;
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
