let pokemonRepository=function(){let e=[],t=document.querySelector("#search-bar"),n="https://pokeapi.co/api/v2/pokemon/?limit=150";function o(t){"object"==typeof t&&"name"in t?e.push(t):console.log("pokemon is not correct")}function i(e){let t=e.detailsUrl;return fetch(t).then(function(e){return e.json()}).then(function(t){console.log(t.sprites),e.imageUrl=t.sprites.other.dream_world.front_default,e.height=t.height,e.weight=t.weight,e.types=t.types.map(function(e){return e.type.name}),e.abilities=t.abilities.map(function(e){return e.ability.name})}).catch(function(e){console.error(e)})}function c(e){i(e).then(function(){!function(e){let t=document.querySelector(".modal-body"),n=document.querySelector(".modal-title");t.innerHTML="",n.innerHTML="";let o=document.createElement("h1");o.innerText=e.name;let i=document.createElement("img");i.src=e.imageUrl;let c=document.createElement("p");c.innerText="Height: "+e.height;let l=document.createElement("p");l.innerText="Weight: "+e.weight;let r=document.createElement("p");r.innerText="Types: "+e.types;let a=document.createElement("p");a.innerText="Abilities: "+e.abilities,n.append(o),t.append(i),t.append(c),t.append(l),t.append(r),t.append(a)}(e)})}return t.addEventListener("input",function(){let e=document.querySelectorAll("li"),n=t.value.toUpperCase();e.forEach(function(e){e.innerText.toUpperCase().indexOf(n)<0&&(e.style.display="none")})}),{add:o,getAll:function(){return e},addListItem:function(e){let t=document.querySelector(".list-group"),n=document.createElement("li"),o=document.createElement("button");n.classList.add("group-list-item"),o.innerText=e.name,o.classList.add("btn-success"),o.setAttribute("data-toggle","modal"),o.setAttribute("data-target","#pokemon-modal"),n.appendChild(o),t.appendChild(n),o.addEventListener("click",function(t){c(e)})},loadList:function(){return fetch(n).then(function(e){return e.json()}).then(function(e){e.results.forEach(function(e){o({name:e.name,detailsUrl:e.url})})}).catch(function(e){console.error(e)})},loadDetails:i,showDetails:c}}(),mybutton=document.getElementById("btn-back-to-top");function scrollFunction(){document.body.scrollTop>20||document.documentElement.scrollTop>20?mybutton.style.display="block":mybutton.style.display="none"}function backToTop(){document.body.scrollTop=0,document.documentElement.scrollTop=0}window.onscroll=function(){scrollFunction()},mybutton.addEventListener("click",backToTop),pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})});