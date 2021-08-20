//wrap Pokemon ArrayList in IIFE 

let pokemenRepository = (function () {
  let PokemenList = [
    // {
    //   name: 'Genesect',
    //   height: 1.5,
    //   weight: 82.5,
    //   abilities: ['download'],
    // },
    // {
    //   name: 'Shuckle',
    //   height: 0.6,
    //   weight: 20.5,
    //   abilities: ['Sturdy', 'Gluttony', 'Contrary'],
    // },
    // {
    //   name: 'Loudred',
    //   height: 1,
    //   weight: 40.5,
    //   abilities: ['Soundproof', 'Scrappy'],
    // }
  ]; // PokemenList empty array
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
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
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
    };
}) ();

pokemenRepository.add({ name: 'Kris' });

console.log(pokemenRepository.getAll());

//console.log(this, "this is outside", this == document)
/*
PBV vs PBR
const testObj = {};
const testObj2 = {};
const testObj3 = testObj;
const aString = 'hello again';
const stringAlong = aString;
const anotherString = 'hello';
console.log(aString === anotherString);
console.log(testObj === testObj3)
*/

//cleaner forEach() code using myLoopFunction -- updated to include new IIFE
  pokemenRepository.loadList().then(function() {
  pokemenRepository.getAll().forEach(function(pokemen) {
    pokemenRepository.addListItem(pokemen);
    });
  })

  //console.log(this, "this is inside")
  //console.log(Array.isArray(pokemen));

  // --section was moved to function addListItem()--
  // let pokemenList = document.querySelector('.pokemen-list');
  // let listItem = document.createElement('li');
  // let button = document.createElement('button');
  // button.innerText = pokemen.name;
  // button.classList.add("button-class");
  // listItem.appendChild(button);
  // pokemenList.appendChild(listItem);

  // console.log(pokemen.length)
  //   if (pokemen.height > 1) {
  //     document.write(/*`<p> "${pokemen.name} (height: ${pokemen.height})" <b> I am the Tallest Pokemen!</b> </p>`*/);
  //   } else {
  //     document.write(/*`<p> "${pokemen.name} (height: ${pokemen.height})" </p>`*/);
  //   }
  //   //keeping code to use later
  //   //console.log(Pokemen.name + ' is ' + Pokemen.height + ' tall and weighs' + Pokemen.weight + ' . ');
  //   //console.log(Pokemen.name + ' can ' + Pokemen.abilities + ' . ');

// other functions remain here

// let pokemonRepository = (function () {
//   let pokemonList = [];
//   let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Other functions remain here

//   function loadList() {
//     return fetch(apiUrl).then(function (response) {
//       return response.json();
//     }).then(function (json) {
//       json.results.forEach(function (item) {
//         let pokemon = {
//           name: item.name,
//           detailsUrl: item.url
//         };
//         add(pokemon);
//       });
//     }).catch(function (e) {
//       console.error(e);
//     })
//   }

//   return {
//     add: add,
//     getAll: getAll,
//     loadList: loadList
//   };
// })();

// pokemonRepository.loadList().then(function() {
//   // Now the data is loaded!
//   pokemonRepository.getAll().forEach(function(pokemon){
//     pokemonRepository.addListItem(pokemon);
//   });
// });

// load list function below

// let pokemonRepository = (function () {
//   // Other functions here…

//   function loadDetails(item) {
//     let url = item.detailsUrl;
//     return fetch(url).then(function (response) {
//       return response.json();
//     }).then(function (details) {
//       // Now we add the details to the item
//       item.imageUrl = details.sprites.front_default;
//       item.height = details.height;
//       item.types = details.types;
//     }).catch(function (e) {
//       console.error(e);
//     });
//   };
//