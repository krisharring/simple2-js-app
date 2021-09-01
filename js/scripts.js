let pokemonRepository = (function () {
  let pokemonList = []; // empty array
  let searchInput = document.querySelector('#search-bar');
  // API link
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // to push pokemon
    function add(pokemon) {
      if (
        typeof pokemon === "object" && "name" in pokemon) 
      {
        pokemonList.push(pokemon);
      } else {
        console.log("pokemon is not correct");
      }
    }

  //returning pokemon list
  function getAll() {
      return pokemonList;
    }

  function addListItem(pokemon) {
     let pokemonList = document.querySelector(".list-group");
     let listpokemon = document.createElement("li");
     let button = document.createElement("button");
     listpokemon.classList.add("group-list-item");
     button.innerText = pokemon.name;
     button.classList.add("btn-success");
     button.setAttribute("data-toggle", 'modal');
     button.setAttribute("data-target", "#pokemon-modal");

    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);

    //Event listener on a click of a button
     button.addEventListener('click', function(event) {
       showDetails(pokemon);
      });
    }
    //Fetching pokemon list from API
      function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        })
        .then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url,
            };
            add(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
        })
      }

      //Fetching pokemon details from API
      function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        })
        .then(function (details) {
          // Now we add the details to the item
          console.log(details.sprites);
          pokemon.imageUrl = details.sprites.other.dream_world.front_default;
          pokemon.height = details.height;
          pokemon.weight = details.weight;

          pokemon.types = details.types.map(function(x) {
            return x.type.name;
          });
          pokemon.abilities = details.abilities.map(function(x) {
            return x.ability.name;
          });
        })
        .catch(function (e) {
          console.error(e);
        });
      }

      function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
          showModal(pokemon);
        });
      }
      //Modal
      function showModal(pokemon) {
        let modalBody = document.querySelector('.modal-body');
        let modalTitle = document.querySelector('.modal-title');
        modalBody.innerHTML = "";
        modalTitle.innerHTML = "";
        
        //Pokemon descriptions
        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;

        let imageElement = document.createElement('img');
        imageElement.src = pokemon.imageUrl;

        let heightElement = document.createElement('p');
        heightElement.innerText = 'Height: ' + pokemon.height;

        let weightElement = document.createElement('p');
        weightElement.innerText = 'Weight: ' + pokemon.weight;

        let typesElement = document.createElement('p');
        typesElement.innerText = 'Types: ' + pokemon.types;

        let abilitiesElement = document.createElement('p');
        abilitiesElement.innerText = 'Abilities: ' + pokemon.abilities;

        modalTitle.append(titleElement);
        modalBody.append(imageElement);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
        modalBody.append(abilitiesElement);
      }

      //search bar
      searchInput.addEventListener("input", function() {
        let listPokemon = document.querySelectorAll("li");
        let value = searchInput.value.toUpperCase();

        listPokemon.forEach(function(pokemon) {
          if (pokemon.innerText.toUpperCase().indexOf(value) < 0) {
            pokemon.style.display = "none";
          }        
        });
      });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

  pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });
