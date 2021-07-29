//Pokemen Array List
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
];


//loop of PokemanList names (how do i add spaces between the names?)
//let nameArray = [ 'Genesect', 'Shuckle', 'Loudred'];
//for (let i=0; i < nameArray.length; i++){
//  document.write(nameArray[i]);
//}

//Use what you’ve learned about adding strings in JavaScript to write the Pokémon’s height next to its name, for example, “Bulbasaur (height: 7)”.

for (let i = 0; i < PokemenList.length; i++){
		document.write(`<p> "${PokemenList[i].name} (height: ${PokemenList[i].height})" </p>`);
	}


