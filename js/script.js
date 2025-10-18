import {
  getMoviesByGenreAndPage,
  searchMoviesByNameAndPage,
} from "./movieApi.js";

const searchBar = document.getElementById("search-bar");
const movieGrid = document.getElementById("movies-grid");

document.addEventListener("DOMContentLoaded", async () => {
  const shows = await getMoviesByGenreAndPage(0, 1);
  renderMovies(shows.results);
  console.log(shows);

  searchBar.addEventListener("input", searchShows);
});

// for highlighting filters and its functionality, eg., (All, Action, Comedy etc.,)
document.querySelectorAll(".movies__filter-item").forEach((item) => {
  item.addEventListener("click", async () => {
    document
      .querySelectorAll(".movies__filter-item")
      .forEach((li) => li.classList.remove("movies__filter-item--highlight"));

    item.classList.add("movies__filter-item--highlight");
    const genreId = item.dataset.genreid;

    const shows =
      genreId != "0"
        ? await getMoviesByGenreAndPage(genreId, 1)
        : await getMoviesByGenreAndPage(null, 1);

    renderMovies(shows.results);
  });
});

// pagination feature
document.querySelectorAll(".page-item").forEach((item) => {
  item.addEventListener("click", async () => {
    // clear previous highlighted page number
    document.querySelectorAll(".page-link").forEach((p) => {
      p.classList.remove("active");
      p.classList.add("bg-dark");
    });

    // identify the chosen filter
    const genre =
      document.querySelector(".movies__filter-item--highlight").dataset
        .genreid || null;

    // get the number of the selected page
    const page = Number(item.querySelector("a").textContent);

    if (page >= 1) {
      const left = document.querySelector(".left");
      left.textContent = page - 1;
      const middle = document.querySelector(".middle");
      middle.textContent = page;
      const right = document.querySelector(".right");
      right.textContent = page + 1;

      // higlight the selected page number
      middle.classList.add("active");
      middle.classList.remove("bg-dark");

      const shows =
        genre == 0
          ? await getMoviesByGenreAndPage(null, page)
          : await getMoviesByGenreAndPage(genre, page);

      renderMovies(shows.results);
    }
  });
});

async function searchShows() {
  const searchInput = searchBar.value;

  const searched = searchInput
    ? await searchMoviesByNameAndPage(searchInput, 1)
    : await getMoviesByGenreAndPage(0, 1);

  const shows = searched.results.map((movie) => {
    return `
    <div class="movies__card">
      <img class="movies__card-image" src=${`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} />
      <section class="movies__card-content">
        <div>
          <h3 class="movies__card-title fw-bold text-light">${
            movie.title || movie.name
          }</h3>
          <p class="movies__card-description">${movie.overview}</p>
        </div>
        <div class="movies__card-footer">
          <span class="movies__card-date">${
            movie.release_date || movie.first_air_date
          }</span>
          <button class="movies__card-favorite-btn">💖</button>
        </div>
      </section>
    </div>`;
  });
  movieGrid.innerHTML = shows.join("");
}

function renderMovies(shows) {
  const movieCards = shows.map((movie) => {
    return `
    <div class="movies__card">
      <img class="movies__card-image" src=${`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} />
      <section class="movies__card-content">
        <div>
          <h3 class="movies__card-title fw-bold text-light">${
            movie.title || movie.name
          }</h3>
          <p class="movies__card-description">${movie.overview}</p>
        </div>
        <div class="movies__card-footer">
          <span class="movies__card-date">${
            movie.release_date || movie.first_air_date
          }</span>
          <button class="movies__card-favorite-btn">💖</button>
        </div>
      </section>
    </div>`;
  });

  movieGrid.innerHTML = movieCards.join("");
}
