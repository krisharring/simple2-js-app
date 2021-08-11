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

  return {
    add: add,
    getAll: getAll
  };
}) ();

console.log(pokemenRepository.getAll()); // []
pokemonRepository.add({ name: 'Genesect' });
console.log(pokemenRepository.getAll()); // [ { name: 'Genesect' } ]


//loop of PokemanList names (how do i add spaces between the names?)
//let nameArray = [ 'Genesect', 'Shuckle', 'Loudred'];
//for (let i=0; i < nameArray.length; i++){
//  document.write(nameArray[i]);
//}

//Use what you’ve learned about adding strings in JavaScript to write the Pokémon’s height next to its name, 
//for example, “Bulbasaur (height: 7)”.

//for (let i = 0; i < PokemenList.length; i++){
//		document.write(`<p> "${PokemenList[i].name} (height: ${PokemenList[i].height})" </p>`);
//	}

//Next, add code to highlight special Pokémon in your list. Be sure to keep adding comments to explain and 
//document what your code does. Within the loop, add a conditional. The conditional should check if the height 
//is above a certain value (you’re free to pick whatever value you want). If it is, add the note “Wow, that’s big!” 
//to the output. Make sure you set up the conditional so that only one Pokémon has the label “Wow, that’s big!” 
//It could, for example, look like this: “Bulbasaur (height: 7) - Wow, that’s big!”. 
//For example, if you had the following array:

//for (let i=0; i < PokemenList.length; i++){
//  if (PokemenList[i].height > 1) {
//    document.write(`<p> "${PokemenList[i].name} (height: ${PokemenList[i].height})" <b> I am the Tallest Pokemen!</b> </p>`)
//  }
//  else {
//  document.write(`<p> "${PokemenList[i].name} (height: ${PokemenList[i].height})" </p>`);
//  }
//}

//forEach() function below
//PokemenList.forEach(function(Pokemen){
//  console.log(Pokemen.name + ' is ' + Pokemen.height + ' tall ');
//});

//cleaner forEach() code using myLoopFunction -- updated to include new IIFE
pokemenRepository.getAll().forEach(function(pokemen){
  if (PokemenList[i].height > 1) {
        document.write(`<p> "${PokemenList[i].name} (height: ${PokemenList[i].height})" <b> I am the Tallest Pokemen!</b> </p>`)
  } else {
        document.write(`<p> "${PokemenList[i].name} (height: ${PokemenList[i].height})" </p>`);
  }
  //keeping code to use later
  //console.log(Pokemen.name + ' is ' + Pokemen.height + ' tall and weighs' + Pokemen.weight + ' . ');
  //console.log(Pokemen.name + ' can ' + Pokemen.abilities + ' . ');
})
