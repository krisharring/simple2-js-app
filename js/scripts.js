//wrap Pokemon ArrayList in IIFE 

let pokemenRepository = (function () {
  let PokemenList = [
    {
      name: 'Genesect',
      height: 1.5,
      weight: 82.5,
      abilities: ['download'],
    },
    {
      name: 'Shuckle',
      height: 0.6,
      weight: 20.5,
      abilities: ['Sturdy', 'Gluttony', 'Contrary'],
    },
    {
      name: 'Loudred',
      height: 1,
      weight: 40.5,
      abilities: ['Soundproof', 'Scrappy'],
    }
  ]; // PokemenList array

  function add(pokemen) {
    PokemenList.push(pokemen);
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

  function showDetails(listItem){
    pokemenRepository.loadDetails(listItem).then(function () {
      console.log(listItem);
    });
  }

  function showDetails(pokemen){
    console.log(pokemen.name);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
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

  pokemenRepository.getAll().forEach(function(pokemen) {
    pokemenRepository.addListItem(pokemen);
  });
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
