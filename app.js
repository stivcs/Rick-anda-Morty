const tbody = document.getElementById("container-grid");


// Llamada a la API mediante fetch
const getData = async (url) => {
const response = await fetch(url);
const data = await response.json();
return data.results;
};

// Función que imprime la data en el DOM
const printRow = (character, container, image2) => {
	let row = document.createElement('tr');
	row.setAttribute('id', character.id);
	row.innerHTML = `
    ${
		image2
			? `
        <td>${character.name}</td>
        <td>${character.gender} , ${character.status} , ${character.species}</td>
        <td><img src="${character.image}" alt="${character.name}"> , <img src="${image2}" alt="${character.name}"> </td>
        `
			: ''
	}`;
	container.appendChild(row);
	if (image2) return true;
	else return false;
};

// Obtener imagen del personaje con el mismo nombre pero que no sea el mismo personaje (si existe) y buscar la imagen desde el personaje actual por id
const searchCharacterImage = (character, data) => {
	const characterImage = data.find((character2) => {
		const characterName = character2.name.toLowerCase();
		const searchName = character.name.toLowerCase();
		// return characterName.includes(searchName) && character2.id !== character.id;
		return (
			characterName != searchName &&
			characterName.includes(searchName.split(' ')[0]) &&
			character.species == character2.species &&
			character.gender == character2.gender
		);
	});
	return characterImage ? characterImage.image : false;
};

// Obtener datos de la API de forma asíncrona
const fetchData = async () => {
	const results = [];
	for (let page = 1; page <= 42; page++) {
		const url = `https://rickandmortyapi.com/api/character?page=${page}`;
		const data = await getData(url);
		results.push(...data);
	}
	return results;
};

// Obtener un número aleatorio entre 0 y el número máximo de personajes
const getRandomIndex = (max, usedIndexes) => {
	let randomIndex = Math.floor(Math.random() * max);

	while (usedIndexes.includes(randomIndex))
		randomIndex = Math.floor(Math.random() * max);
	return randomIndex;
};

// Imprimir la tabla con los datos obtenidos
fetchData() //results
	.then((charactersArray) => {
		// Data sin renderizar aleatoriamente

		// data.forEach((character) => {
		// 	const characterImage = searchCharacterImage(character, data);
		// 	printRow(character, tbody, characterImage);
		// });

		// Data pero renderizando aleatoriamente
		console.log(charactersArray);
		const usedIndexes = [];
		let printedRow = false;
		for (let i = 0; i < 10; printedRow ? i++ : i) {
			const randomIndex = getRandomIndex(charactersArray.length,usedIndexes);
			const character = charactersArray[randomIndex];
			const characterImage = searchCharacterImage(
				character,
				charactersArray
			);
			printedRow = printRow(character, tbody, characterImage);
			console.log(printedRow)
			usedIndexes.push(randomIndex);
		}
	})
	.catch((error) => {
		console.error('Error:', error);
	});

//-----------------

// const API_BASE = "https://rickandmortyapi.com/api"
// const API_CHARACTERS = "https://rickandmortyapi.com/api/character/"
// const APIRICK = "https://rickandmortyapi.com/api/character/?name=rick"
// const llamadaApi = fetch(API_CHARACTERS);
// const llamadaRick = fetch(APIRICK);
// var imgAlt;

// llamadaRick.then((data) => {
//     return data.json();
// }).then((data) => {
//     imgAlt = `<td><img class"character-image" src=${data.results[2].image} alt="imagen de personaje"/></td>`
// })


// function mostrarDatos(data) {
//     console.log(data.results[0].name);
//     for (let i = 0; i <= 10; i++) {
//       characters.innerHTML += `
//         <tr>
//           <td>${data.results[i].name}</td>
//           <td>${data.results[i].gender} , ${data.results[i].species} , ${data.results[i].status}</td>
//           <td><img class"character-image" src=${data.results[i].image} alt="imagen de personaje"/> <img class"character-image" src=${data.results[i+10].image} alt="imagen de personaje"/></td>
//         </tr>
//       `;
//     }
//   }
  
//   llamadaApi
//     .then((data) => {
//       return data.json();
//     })
//     .then((data) => {
//       mostrarDatos(data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });