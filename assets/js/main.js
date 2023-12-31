const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 15;
const limit = 5;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
  <li class="pokemon ${pokemon.type}" id="puxarPokemon" onclick="window.location.href = './assets/html/page.html'">
    <span class="number">#${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>

    <div class="detail">
      <ol class="types">
        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
      </ol>

      <img src="${pokemon.sprite}" alt=${pokemon.name}>

    </div>
  </li>
`
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit)
    .then((pokemons = []) => {
      const newHtml = pokemons.map((pokemon) => convertPokemonToLi(pokemon)).join('')
      pokemonList.innerHTML += newHtml;
      console.log(pokemons);
    })
}

loadPokemonItens(offset, limit);


loadMoreButton.addEventListener('click', () => {
  offset += limit;
  const qntRecord = offset + limit;

  if (qntRecord >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit)

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  }
  else {
    loadPokemonItens(offset, limit);
  }
});


