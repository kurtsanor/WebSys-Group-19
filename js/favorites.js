import { getTrailerByIdAndType } from "./movieApi.js";

const movieGrid = document.getElementById("movies-grid");

let movies = [];

function getFavorites() {
  const stored = localStorage.getItem("favorites");
  return stored ? JSON.parse(stored) : [];
}

function isFavorite(movieId) {
  const stored = localStorage.getItem("favorites");
  const favorites = stored ? JSON.parse(stored) : [];

  return favorites.some((fav) => fav.id == movieId);
}

function handleFavorite(movie) {
  const stored = localStorage.getItem("favorites");
  let favorites = stored ? JSON.parse(stored) : [];

  if (favorites.some((fav) => fav.id == movie.id)) {
    const updatedFavorites = favorites.filter((fav) => fav.id != movie.id);

    console.log("favorite removed");
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    const newFavorites = getFavorites();
    renderMovies(newFavorites);
    return;
  }
  favorites.push(movie);
  console.log("fav added");
  localStorage.setItem("favorites", JSON.stringify(favorites));

  const newFavorites = getFavorites();
  renderMovies(newFavorites);
}

function renderMovies(shows) {
  movies = [];
  movieGrid.innerHTML = "";
  const movieCards = shows.forEach((movie) => {
    movies.push(movie);
    const card = document.createElement("div");
    card.classList.add("movies__card");
    card.innerHTML = `
      <img data-bs-toggle="modal" data-bs-target="#exampleModal" class="movies__card-image" src=${`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} />
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
          <button class="movies__card-favorite-btn">${
            isFavorite(movie.id) ? "❤️" : "🤍"
          }</button>
        </div>
      </section>`;

    const imageCard = card.querySelector(".movies__card-image");
    imageCard.addEventListener("click", async () => {
      const url = await getTrailerUrl(movie);
      const body = modalElement.querySelector(".modal-body");
      body.innerHTML = `
        <iframe
          src="https://www.youtube.com/embed/${url}"
          width="100%"
          height="400px"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      `;
    });

    const buttonFavorite = card.querySelector(".movies__card-favorite-btn");
    buttonFavorite.addEventListener("click", () => handleFavorite(movie));

    movieGrid.appendChild(card);
  });
  // movieGrid.innerHTML = movieCards.join("");
}

const favorites = getFavorites();
renderMovies(favorites);

const modalElement = document.getElementById("exampleModal");
modalElement.addEventListener("hidden.bs.modal", () => {
  // Clear modal content
  modalElement.querySelector(".modal-body").innerHTML = "";
});

async function getTrailerUrl(movie) {
  const type = movie.first_air_date ? "tv" : "movie";
  const data = await getTrailerByIdAndType(movie.id, type);
  const trailer = data.results.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
  );
  return trailer ? trailer.key : null;
}
