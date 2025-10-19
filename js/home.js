import { getPlayingNowMovies, getTrailerByIdAndType } from "./movieApi.js";

const heroSection = document.getElementById("hero-section");

const res = await getPlayingNowMovies();
const featuredMovie = res.results.splice(0, 1)[0];

heroSection.innerHTML = "";
const hero = document.createElement("div");
hero.innerHTML = `
      <div class="hero__overlay"></div>
      <img src=${`https://image.tmdb.org/t/p/original/${featuredMovie.backdrop_path}`} alt="Fantastic 4" class="hero__image" />
      <div class="hero__content">
        <h1 class="hero__title">${
          featuredMovie.title || featuredMovie.name
        }</h1>
        <p class="hero__description">
          ${featuredMovie.overview}
        </p>
        <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal" class="hero__button--primary">▶ Watch</a>
      </div>
      `;

const imageCard = hero.querySelector(".hero__button--primary");
imageCard.addEventListener("click", async () => {
  const url = await getTrailerUrl(featuredMovie);
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

heroSection.appendChild(hero);

function chunkArray(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

function renderCarousel(items) {
  const innerCarousel = document.getElementById("inner-carousel");
  innerCarousel.innerHTML = ""; // Clear existing slides

  const chunks = chunkArray(items, 6);

  chunks.forEach((group, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("carousel-item");
    if (index === 0) itemDiv.classList.add("active");

    const row = document.createElement("div");
    row.classList.add("row");

    group.forEach((item) => {
      const col = document.createElement("div");
      col.classList.add("col-md-2");

      col.innerHTML = `
        <div class="card">
          <img data-bs-toggle="modal" data-bs-target="#exampleModal" src=${`https://image.tmdb.org/t/p/w500/${item.poster_path}`} class="card-img-top" alt="${
        item.title
      }" />
        </div>
      `;

      const imageCard = col.querySelector(".card-img-top");
      imageCard.addEventListener("click", async () => {
        const url = await getTrailerUrl(item);
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

      row.appendChild(col);
    });

    itemDiv.appendChild(row);
    innerCarousel.appendChild(itemDiv);
  });
}

renderCarousel(res.results);

async function getTrailerUrl(movie) {
  const type = movie.first_air_date ? "tv" : "movie";
  const data = await getTrailerByIdAndType(movie.id, type);
  const trailer = data.results.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
  );
  return trailer ? trailer.key : null;
}

const modalElement = document.getElementById("exampleModal");
modalElement.addEventListener("hidden.bs.modal", () => {
  // Clear modal content
  modalElement.querySelector(".modal-body").innerHTML = "";
});
