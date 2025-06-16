// Function to fetch movie data from filmes.json
async function fetchMovies() {
  try {
    const response = await fetch("/filmes");
    if (!response.ok) {
      throw new Error("Failed to fetch movie data");
    }
    const movies = await response.json();
    return movies;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

// Function to dynamically populate the movie gallery
async function populateMovieGallery() {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = ""; // Clear existing content

  const movies = await fetchMovies();

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
      <img src="${movie.image}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
    `;



    movieCard.addEventListener("click", () => {
      window.location.href = `/details.html?id=${movie.id}`;
    });

    gallery.appendChild(movieCard);
  });
  const addMoviecard = document.createElement("div");
  addMoviecard.classList.add("add-movie-card");
  addMoviecard.classList.add("movie-card");
  addMoviecard.innerHTML = `
  <button class="add-movie-button">+</button>
  <p>Adicionar Filme</p>
  `;
  gallery.appendChild(addMoviecard);
}

// Event listener for the "Explore Now" button
function setupExploreButton() {
  const exploreButton = document.querySelector(".cta-button");
  exploreButton.addEventListener("click", () => {
    alert("Explore the best movies now!");
  });
}

function setupAddMovieModal() {
  const addMovieCard = document.querySelector(".add-movie-card");
  const modal = document.getElementById("addMovieModal");
  const closeButton = modal.querySelector(".close-button");
  const addMovieForm = document.getElementById("addMovieForm");
  const gallery = document.querySelector(".gallery");

  // Open modal
  addMovieCard.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // Close modal
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Add new movie
  addMovieForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = document.getElementById("movieTitle").value;
    const image = document.getElementById("movieImage").value;

    const newMovie = { title, image, id: Date.now().toString() };
    addMovieToGallery(newMovie);
    const response = await fetch("/filmes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    });
    if (!response.ok) {
      console.error("Failed to add new movie");
      return;
    }
    addMovieForm.reset();
    modal.style.display = "none";
    alert("Movie added successfully!");
    // Refresh the gallery
    gallery.innerHTML = ""; // Clear existing content
    await populateMovieGallery();
  });
}

function addMovieToGallery(movie) {
  const gallery = document.querySelector(".gallery");

  const movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");

  movieCard.innerHTML = `
    <img src="${movie.image}" alt="${movie.title}" />
    <h3>${movie.title}</h3>
  `;

  movieCard.addEventListener("click", () => {
    window.location.href = `/details.html?id=${movie.id}`;
  });

  gallery.appendChild(movieCard);
}

function init() {
  populateMovieGallery().then(() => {
    setupAddMovieModal();
  });
  setupExploreButton();
}

document.addEventListener("DOMContentLoaded", init);
