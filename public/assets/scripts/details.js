// Função para buscar os dados dos filmes do filmes.json
async function fetchMovies() {
  try {
    const response = await fetch("/filmes");
    if (!response.ok) {
      throw new Error("Erro ao buscar os dados dos filmes");
    }
    const movies = await response.json();
    return movies;
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    return [];
  }
}

// Função para obter os parâmetros da URL
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    id: params.get("id"),
  };
}

// Função para preencher os detalhes do filme
async function populateMovieDetails() {
  const { id } = getQueryParams();
  const movies = await fetchMovies();
  
  // Encontrar o filme correspondente ao ID
  const movie = movies.find((movie) => movie.id === id);
  if (movie != undefined) {
    document.getElementById("img-details").src = movie.image;
    document.getElementById("img-details").alt = movie.title;
    document.getElementById("title").textContent = movie.title;
    document.getElementById("desc").textContent = movie.description;
  } else {
    document.querySelector(".container").innerHTML = `
      <h1>Filme não encontrado</h1>
      <p>O filme que você está procurando não está disponível.</p>
    `;
  }
}

// Inicializar a página
function init() {
  populateMovieDetails();
}

// Executar a função de inicialização quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", init);