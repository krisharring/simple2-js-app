let pokemonRepository = (function (){
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

Object.keys(pokemonRepository).forEach(function(property) {
  console.log(pokemonRepository[property]);
  });

  function add(pokemon) {
    // if (
    // typeof pokemon === "object" &&
    // "name" in pokemon
    // ) {
        pokemonList.push(pokemon);
      // } else {
      //   console.log("pokemon is not correct");
      // }
  }

  function getAll() {
    return pokemonList;
  }

  function remove(start, number) {
    document.write(`<br><p>${pokemonList[start].name} has been removed.)
      </p><p> This is the updated list: </p><br>`);
    pokemonList.splice(start, number);
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
      listpokemon.classList.add("group-list-item");
      listpokemon.classList.add('col-md');
    let button = document.createElement("button");
      button.innerText = pokemon.name.toUpperCase();
      // button.classList.add("button-class");
      button.classList.add('btn-lg', 'btn-primary');
      button.dataset.target = '#pokemonModal';
      button.dataset.toggle = 'modal';
      listpokemon.appendChild(button);
      pokemonList.appendChild(listpokemon);
      button.addEventListener("click", function(event) {
        showDetails(pokemon);
      });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types[0].type.name;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon){
    loadDetails(pokemon).then(function() {
      showModal((`${pokemon.name}`), (`height: ${pokemon.height}`), pokemon.imageUrl);
      // pokemonName.innerHTML = pokemon.name;
      // pokemonHeight.innerHTML = 'Height: ' + pokemon.height;
      // pokemonType.innerHTML = 'Type: ' + pokemon.types;
      // pokemonImage.src = pokemon.imageUrl;
      // modalClose.innerHTML = "Close";
    });
  }

  // SHOW MODAL FUNCTION
  function showModal(title, text, image) {
    // modalContainer.classList.add('is-visible');

      // MODAL
      // let modalContainer = document.querySelector('#modal-container');
      let modalContent = document.querySelector('.modal-content');
      let modalHeader = document.querySelector('.modal-header');
      let modalFooter = document.querySelector('.modal-footer');
      // let modal = document.querySelector('.modal');
      let buttonClose = document.querySelector('#close');
      let buttonX = document.querySelector('#button-x');
      // let modalClose = document.createElement('button');
      //   modalClose.classList.add('modal-close');
      let titleElement = document.createElement('h1');
      titleElement.innerText = title;
      // let pokemonName = document.createElement('h1');
      //   pokemonName.classList.add('Pokemon-name');
      let contentElement = document.createElement('p');
      contentElement.innerText = text;
      // let pokemonHeight = document.createElement('p');
      //   pokemonHeight.classList.add('Pokemon-height');
      // let pokemonType = document.createElement('p');
      //   pokemonType.classList.add('Pokemon-type');
      let imgElement = document.createElement('img');
      contentElement.src = image;
      // let imageContainer = document.createElement('div');
      //   imageContainer.classList.add('img-container');
      // let pokemonImage = document.createElement('img');
      //   pokemonImage.classList.add('Pokemon-image');
  
      // modalContent.innerHTML = '';
      modalHeader.innerHTML = '';
      modalBody.innerHTML = '';
      modalHeader.appendChild(titleElement);
      modalBody.appendChild(contentElement);
      modalBody.appendChild(imgElement);
      modalHeader.appendChild(buttonX); 
      modalFooter.appendChild(buttonClose);
      modalContent.appendChild(modalHeader);
      modalContent.appendChild(modalBody);
      modalContent.appendChild(modalFooter);

    // // HIDE MODAL
    // function hideModal() {
    //   modalContainer.classList.remove('is-visible');
    // }

    // // TO CLOSE WINDOW OF MODAL
    // modalClose.addEventListener('click' , hideModal);

    // // WHEN ESC IS PRESSED TO CLOSE THE MODAL
    //  window.addEventListener('keydown', (e) => {
    //   if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    //     hideModal();  
    //   }
    // });

    // // WHEN OUTSIDE THE MODAL CLICKED
    // modalContainer.addEventListener('click', (e) => {
    //   // Since this is also triggered when clicking INSIDE the modal
    //   // We only want to close if the user clicks directly on the overlay
    //   let target = e.target;
    //     if (target === modalContainer) {
    //       hideModal();
    //     }
    //   });
      
    //   modal.appendChild(modalClose);
    //   modal.appendChild(pokemonName);
    //   modal.appendChild(pokemonHeight);
    //   modal.appendChild(pokemonType);
    //   modal.appendChild(imageContainer);
    //   imageContainer.appendChild(pokemonImage);
  }
   

    // let dialogPromiseReject; // FOR LATER USE


  return {
     add: add,
     getAll: getAll,
     remove: remove,
     addListItem: addListItem,
     loadList: loadList,
     loadDetails: loadDetails,
     showModal: showModal,
     showDetails: showDetails,
  };

})();

// pokemonRepository.add({ name: 'Moltres', height: 2, type: ['Fire','Flying'] }); 
  // console.log(pokemonRepository.getAll());
    pokemonRepository.loadList().then(function () {
        pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
        });
    });

let result = pokemonRepository.getAll().filter(pokemon => pokemon.length > 4);
  console.log(result);

  let mybutton = document.getElementById("btn-back-to-top");

function scrollFunction() {
    document.body.scrollTop > 200 || document.documentElement.scrollTop > 200 ? mybutton.style.display = "block" : mybutton.style.display = "none"
}

function backToTop() {
    document.body.scrollTop = 0, document.documentElement.scrollTop = 0
}
window.onscroll = function() {
    scrollFunction()
}, mybutton.addEventListener("click", backToTop);