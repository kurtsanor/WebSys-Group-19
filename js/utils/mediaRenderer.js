import { getTrailerUrl } from "./trailerFinder.js";
import { handleFavorite, isFavorite } from "./favoritesUtil.js";

export async function renderMedia(media, gridElement, modalElement) {
  gridElement.innerHTML = "";
  media.forEach((data) => {
    const card = document.createElement("div");
    card.classList.add("movies__card");
    card.innerHTML = `
      <img data-bs-toggle="modal" data-bs-target="#exampleModal" class="movies__card-image" src=${`https://image.tmdb.org/t/p/w500/${data.backdrop_path}`} />
      <section class="movies__card-content">
        <div>
          <h3 class="movies__card-title fw-bold text-light">${
            data.title || data.name
          }</h3>
          <p class="movies__card-description">${data.overview}</p>
        </div>
        <div class="movies__card-footer">
          <span class="movies__card-date">${
            data.release_date || data.first_air_date
          }</span>
          <button class="movies__card-favorite-btn">${
            isFavorite(data.id) ? "❤️" : "🤍"
          }</button>
        </div>
      </section>`;

    const imageCard = card.querySelector(".movies__card-image");
    imageCard.addEventListener("click", async () => {
      const type = data.first_air_date ? "tv" : "movie";
      const url = await getTrailerUrl(data.id, type);

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
    buttonFavorite.addEventListener("click", (e) => {
      e.stopPropagation();
      handleFavorite(data);
      buttonFavorite.textContent = isFavorite(data.id) ? "❤️" : "🤍";
    });

    gridElement.appendChild(card);
  });
}
