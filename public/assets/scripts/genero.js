// Função para buscar os gêneros do filmes.json
async function fetchGenres() {
  try {
    const response = await fetch("/generos");
    if (!response.ok) {
      throw new Error("Erro ao buscar os gêneros");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar gêneros:", error);
    return [];
  }
}

// Função para preencher a lista de gêneros
async function populateGenres() {
  const genresContainer = document.getElementById("genres-container");
  const genres = await fetchGenres();

  genres.forEach((genre) => {
    const listItem = document.createElement("li");
    listItem.textContent = genre;
    genresContainer.appendChild(listItem);
  });
}



// Inicializar a página
function init() {
  populateGenres();
}

// Executar a função de inicialização quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", init);