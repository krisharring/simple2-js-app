let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
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
  
    function addListItem(pokemon) {
      let list = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      listItem.classList.add('group-list-item');
      listItem.classList.add('col-lg-4', 'col-md-6', 'col');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('btn-lg', 'btn-primary');
      button.dataset.target = '#exampleModal';
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
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      });
    }
  
    function showDetails(pokemon) {
      loadDetails(pokemon).then(function() {
        showModal((`${pokemon.name}`), (`height: ${pokemon.height} m`), pokemon.imageUrl);
      });
    }
  
    function showModal(title, text, image) {
  
      let modalContent = document.querySelector('.modal-content');
  
      let modalHeader = document.querySelector('.modal-header');
      let modalBody = document.querySelector('.modal-body');
      let modalFooter = document.querySelector('.modal-footer');
  
      let buttonClose = document.querySelector('#close');
      let buttonX = document.querySelector('#button-x');
  
      let titleElement = document.createElement('h1');
      titleElement.innerText = title;
  
      let contentElement = document.createElement('p');
      contentElement.innerText = text;
  
      let imgElement = document.createElement('img');
      imgElement.src = image;
  
      // modalContent.innerHTML = '';
      modalHeader.innerHTML = '';
      modalBody.innerHTML = '';
  
      //dynamic modal content
      modalHeader.appendChild(titleElement);
      modalBody.appendChild(contentElement);
      modalBody.appendChild(imgElement);
  
      //missing buttons ???
      modalHeader.appendChild(buttonX); //added close X button
      modalFooter.appendChild(buttonClose); //added Close btn-primary
  
      modalContent.appendChild(modalHeader);
      modalContent.appendChild(modalBody);
      modalContent.appendChild(modalFooter);
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
  
  function changeColor() {
    let body = document.querySelector('body');
    body.classList.toggle('change-color');
  }
  
  let buttonColor = document.querySelector('#change-color');
  buttonColor.addEventListener('click', changeColor);