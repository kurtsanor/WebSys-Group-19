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
