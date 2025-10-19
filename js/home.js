import { getPlayingNowMovies } from "./movieApi.js";

const heroSection = document.getElementById("hero-section");

const res = await getPlayingNowMovies();
const featuredMovie = res.results.splice(0, 1)[0];
console.log(featuredMovie);

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
        <a href="#" class="hero__button--primary">▶ Watch</a>
      </div>
      `;
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
          <img src=${`https://image.tmdb.org/t/p/w500/${item.poster_path}`} class="card-img-top" alt="${
        item.title
      }" />
        </div>
      `;

      row.appendChild(col);
    });

    itemDiv.appendChild(row);
    innerCarousel.appendChild(itemDiv);
  });
}

renderCarousel(res.results);

// const carousel = document.getElementById("inner-carousel");

// const slide = document.createElement("div");
// slide.classList.add("carousel-item active");
