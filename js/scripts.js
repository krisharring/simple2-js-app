//wrap Pokemon ArrayList in IIFE 
let pokemenRepository = (function () {
  //modal
let modalContainer = document.querySelector('#modal-container');
let modal = document.querySelector('.modal');
let modalClose = document.createElement('button');
  modalClose.classList.add('modal-close');
let pokemenName = document.createElement('h1');
  pokemenName.classList.add('Pokemen-name');
let pokemenHeight = document.createElement('p');
  pokemenHeight.classList.add('Pokemen-height');
let pokemenType = document.createElement('p');
  pokemenType.classList.add('Pokemen-type');

let imageContainer = document.createElement('div');
  imageContainer.classList.add('img-container');
let pokemenImage = document.createElement('img');
  pokemenImage.classList.add('Pokemen-image');

    // PokemenList empty array
  let PokemenList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'; // API variable

  function add(pokemen) {
    if (
      typeof pokemen === "object" &&
      "name" in pokemen /*&&
      "detailsUrl" in pokemen*/
    ) {
      PokemenList.push(pokemen);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll() {
    return PokemenList;
  }

  function addListItem(pokemen){
    let pokemenList = document.querySelector('.pokemen-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
      button.innerText = pokemen.name;
      button.classList.add("button-class");
      listItem.appendChild(button);
      pokemenList.appendChild(listItem);
      button.addEventListener('click', function(event){
      showDetails(pokemen);
    });
  }
//modal is inserted here

  // SHOW MODAL FUNCTION
  function showModal() {
    modalContainer.classList.add('is-visible');
  }

  // HIDE MODAL
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

    // TO CLOSE WINDOW OF MODAL
    modalClose.addEventListener('click' , hideModal);

    // WHEN ESC IS PRESSED TO CLOSE THE MODAL
     window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();  
      }
    });

    // WHEN OUTSIDE THE MODAL CLICKED
    modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });

  function showDetails(pokemon){
    loadDetails(pokemon).then(function () {
      pokemonName.innerHTML = pokemon.name;
      pokemonHeight.innerHTML = 'Height: ' + pokemon.height;
      pokemonType.innerHTML = 'Type: ' + pokemon.types;
      pokemonImage.src = pokemon.imageUrl;
      modalClose.innerHTML = "Close";
        showModal();
    });
     
    modal.appendChild(modalClose);
    modal.appendChild(pokemonName);
    modal.appendChild(pokemonHeight);
    modal.appendChild(pokemonType);
    modal.appendChild(imageContainer);
    imageContainer.appendChild(pokemonImage);
  }
     

//after adding Modal
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemen = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemen);
        console.log(pokemen);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types[0].type.name;
    }).catch(function (e) {
      console.error(e);
    })
}
 
function showDetails(item) {
  pokemenRepository.loadDetails(item).then(function (){
    console.log(item);
  });
}

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    hideModal: hideModal,
    };
}) ();

// pokemenRepository.add({ name: 'Kris' });

Object.keys(pokemenRepository).forEach(function(property) {
  console.log(pokemenRepository[property]);
});

// console.log(pokemenRepository.getAll());

//cleaner forEach() code using myLoopFunction -- updated to include new IIFE
  pokemenRepository.loadList().then(function() {
  pokemenRepository.getAll().forEach(function(pokemen) {
    pokemenRepository.addListItem(pokemen);
    });
  })

let result = pokemenRepository.getAll().filter(pokemen => pokemen.length > 4);
  console.log(result);

 