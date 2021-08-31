let pokemonRepository = (function () {
    let pokemonList = [];

    let apiUrl='https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal_container');
    let searchBar = document.querySelector('#searchBar');

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    function remove(start, number) {
        document.write(`<br><p>${pokemonList[start].name} has been removed.
          </p><p> This is the updated list:</p><br>`);
        pokemonList.splice(start, number);
    }

    // adds pokemon to pokedex
    // function addListItem(pokemon) {
    //     let list = document.querySelector('.list-group');
    //     let listItem = document.createElement('li');
    //     listItem.classList.add('group-list-item');
    //     let button = document.createElement('button');
    //     button.innerText = pokemon.name;
    //     button.classList.add('btn', 'btn-primary');
    //     listItem.classList.add('col');
       
    //     button.dataset.target = '#pokemonModal';
    //     button.dataset.toggle = 'modal';

    //     listItem.appendChild(button);
    //     list.appendChild(listItem);
    //     }

    //     button.addEventListener("click", function() {
    //       showDetails(pokemon);
    //     });
    //     listItem.appendChild(button);
    //     pokemonList.appendChild(listItem);
    // }
    function addListItem(pokemon) {
        let list = document.querySelector('.list-group');
        let listItem = document.createElement('li');
        listItem.classList.add('group-list-item');
        addClass('group-list-item');
        listItem.classList.add('col');
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
      
     // fetches pokemon details from API
     function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then (function (json) {
            json.restults.forEach(function(item) {
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

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function(response) {
          return response.json();
        }).then(function(details) {
          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        });
      }

    function showDetails(pokemonToShow) {
      loadDetails(pokemonToShow).then(function() {
        showModal((`${pokemon.name}`), (`height: ${pokemon.height} m`), pokemon.imageUrl);
      });
    }

    // modal with pokemon info
    function showModal(pokemon) {
      modalContainer.innerHTML = "";

      let modal = document.createElement('div');
      modal.classList.add('modal');
  
      let modalBody = $('.modal-body');
      let modalTitle = $('.moday-title');
      let modalHeader = $('.modal-header');
      // clear existing contents of the modal
      modalTitle.empty();
      modalBody.empty();

      //creating element for name of modal content
      let nameElement = $('<h1>' + pokemon.name + '</h1>');
      // creating img in modal content
      let imageElementFront = $("<img class='modal-img' style='width:50%'>");
      imageElementFront.attr('src', pokemon.imageUrlFront);
      // let imageElementBack = $('<img class="modal-img" style="width:50%">');
      imageElementBack.attr('src', pokemon.imageUrlBack);
      // creating element for height in modal content
      let heightElement = $('<p>' + 'height : ' + pokemon.height + '</p>');
      // creating element for weight in modal content
      let weightElement = $('<p>' + 'weight : ' + pokemon.weight + '</p>');
      // creating element for type in modal content
      let typesElement = $("<p>" + 'types' + pokemon.types + "</p>");
      // create element for abilities in social in modal content
      let abilitiesElement = $('<p>' + 'abilities : ' + pokemon.abilities + '</p>');

      modalTitle.append(nameElement);
      modalBody.append(imageElementFront);
      modalBody.append(imageElementBack);
      modalBody.append(heightElement);
      modalBody.append(weightElement);
      modalBody.append(typesElement);
      modalBody.append(abilitiesElement);
    }

      return {
        add: add,
        getAll: getAll,
        remove: remove,
        addListItem: addListItem,
        loadList: loadList,
        loadDetils: loadDetails,
        showModal: showModal,
        showDetails: showDetails,
      };
})();
    
    pokemonRepository.loadList().then(function() {
        // Now the data is loaded!
        pokemonRepository.getAll().forEach(function(pokemon) {
          pokemonRepository.addListItem(pokemon);
        });
    });