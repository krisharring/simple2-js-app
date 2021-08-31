let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let pokedexPokemonList =document.querySelector('.list-group');
    let searchBar = document.querySelector("#searchBar");
    let modal = document.querySelector('.modal-content');

      function getAll() {
        return pokemonList;
      }
      function add(pokemon) {
      pokemonList.push(pokemon);
    }

  function addListItem(pokemon) {
      let list = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      listItem.classList.add('group-list-item');
      listItem.classList.add('col-md-4', 'col-md-4', 'col');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('btn-lg', 'btn-primary');
      button.dataset.target = '#pokemonModal';
      button.dataset.toggle = 'modal';
      listItem.appendChild(button);
      list.appendChild(listItem);
      button.addEventListener('click', function() {
        showDetails(pokemon);
      });
    }

  function loadList() {
      return fetch(apiUrl).then(function(response) {
        return response.json();
      }).then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
          // console.log(pokemon);
        });
      });
    }

  function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function(response) {
        return response.json();
      }).then(function(details) {
        // Now we add the details to the item
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
        item.abilities = details.abilities;
      });
    }

  function showDetails(pokemon) {
      loadDetails(pokemon).then(function() {
  // SHOW MODAL FUNCTION
  // function showModal(title, text, image)
  function showModal(item) {

    let modalBody = $(".modal-body");
    let modalTitle = $(".moday-title");
    let modalHeader = $(".modal-header");
    // clear existing contents of the modal
    modalTitle.empty();
    modalBody.empty();

    //creating element for name of modal content
    let nameElement = $('<h1>" + item.name + "</h1>');
    // creating img in modal content
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", item.imageUrlFront);
    // let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr("src", item.imageUrlBack);
    // creating element for height in modal content
    let heightElement = $("<p>" + "height : " + item.height + "</p>");
    // creating element for weight in modal content
    let weightElement = $("<p>" + "weight : " + item.weight + "</p>");
    // creating element for type in modal content
    let typesElement = $("<p>" + "types" + item.types + "</p>");
    // create element for abilities in social in modal content
    let abilitiesElement = $("<p>" + "abilities : " + item.abilities + "</p");

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }
});
}

  return modalTitle.addEventListener("input", function() {
  }
)();


pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  })
});
