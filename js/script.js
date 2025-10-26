import {
  getMoviesByGenreAndPage,
  searchMoviesByNameAndPage,
  getTrailerByIdAndType,
} from "./api/movieApi.js";
import { renderMedia } from "./utils/mediaRenderer.js";

const searchBar = document.getElementById("search-bar");
const movieGrid = document.getElementById("movies-grid");
const modalElement = document.getElementById("exampleModal");

// render set of media on page load
document.addEventListener("DOMContentLoaded", async () => {
  const result = await getMoviesByGenreAndPage(0, 1);
  const media = result.results;
  renderMedia(media, movieGrid, modalElement);

  searchBar.addEventListener("input", searchShows);
});

// for highlighting filters and its functionality, eg., (All, Action, Comedy etc.,)
document.querySelectorAll(".movies__filter-item").forEach((item) => {
  item.addEventListener("click", async () => {
    document
      .querySelectorAll(".movies__filter-item")
      .forEach((li) => li.classList.remove("active"));

    item.classList.add("active");
    const genreId = item.dataset.genreid;

    const shows =
      genreId != "0"
        ? await getMoviesByGenreAndPage(genreId, 1)
        : await getMoviesByGenreAndPage(null, 1);

    renderMedia(shows.results, movieGrid, modalElement);
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
    const genre = document.querySelector(".active").dataset.genreid || null;

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

      renderMedia(shows.results, movieGrid, modalElement);
    }
  });
});

async function searchShows() {
  const searchInput = searchBar.value;

  const searched = searchInput
    ? await searchMoviesByNameAndPage(searchInput, 1)
    : await getMoviesByGenreAndPage(0, 1);

  renderMedia(searched.results, movieGrid, modalElement);
}

// listener to clear data of modal after closed
modalElement.addEventListener("hidden.bs.modal", () => {
  // Clear modal content
  modalElement.querySelector(".modal-body").innerHTML = "";
});
