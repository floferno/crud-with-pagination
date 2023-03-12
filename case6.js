document.querySelector('#search').addEventListener("click", getPokemon)
//onload
fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100")
    .then(response => {
        if (response.status !== 200) {
            console.log(`Cannot load page. Status code ${response.status}`)
            console.log(response.status)
            return response.json()
        }
        response.json().then(data => {
            const pokemons = data.results
            pokemons.forEach((pokemon, i) => {
                document.querySelector('.pokemon-list').insertAdjacentHTML('beforeend', `<li>${pokemon.name}</li>`)
            })
        })
            .catch(error => {
                console.log('Fetch Error 😫', error)
            })
    })

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function lowerCaseName(str) {
    return str.toLowerCase();
}

async function getPokemon(e) {
    try {

        const name = document.querySelector('#pokemon-name').value
        const nameLowerCase = lowerCaseName(name)
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100")
        const data = await response.json()
        const pokemons = await data.results
        window.addEventListener('DOMContentLoaded', async function () {
            const player = await processPlayerData();
            fillPlayerData(player);
        });

        pokemons.forEach(async (pokemon, i) => {
            // console.log(pokemon.name, "ini nama")
            const pokemonUrl = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`)
            const pokemonDetails = await pokemonUrl.json()
            const abilityList = await pokemonDetails.abilities
            const typeList = await pokemonDetails.types

            if (!nameLowerCase) {
                document.querySelector(".pokemon-detail").innerHTML =
                    `
                        <h1> Pokemon not found 😞</h1>
                    `
            } else if (nameLowerCase == pokemon.name) {
                const pokemonDataToShow = await {
                    name: pokemon.name,
                    image: pokemonDetails.sprites.other["official-artwork"].front_default,
                    height: pokemonDetails.height,
                    weight: pokemonDetails.weight,
                    abilities: abilityList.map((el) => el.ability.name).join('<li>'),
                    types: typeList.map((el) => el.type.name).join('<br><li>') //array
                }

                return displayPokemon(pokemonDataToShow)
            }
        })
        // return displayList(pokemons)

    } catch (error) {
        document.querySelector(".pokemon-detail").innerHTML = `
            <h1> Pokemon not found 😞</h1 >
        `
        console.log(error);
    }

    e.preventDefault();

}

function displayPokemon(pokemon) {
    document.querySelector(".pokemon-detail").innerHTML = `
                    <h1>Pokemon Detail</h1>
                    <div>
                        <img src="${pokemon.image}"
                        alt="${capitalizeFirstLetter(pokemon.name)}"
                        />
                    </div>
                    <div class="pokemon-info">
                        <h2>${capitalizeFirstLetter(pokemon.name)}</h2>
                        <p>Height: ${pokemon.height}</p>
                        <p>Weight: ${pokemon.weight}</p>
                        <p>Abilities:</p>
                        <ul>
                            <li>${pokemon.abilities}</li>
                        </ul>
                        <p>Types:</p>
                        <ul>
                            <li>${pokemon.types}</li>
                        </ul>
                    </div>
                `
    return {
        name: pokemon.name,
        image: pokemon.image,
        height: pokemon.height,
        weight: pokemon.weight,
        abilities: pokemon.abilities,
        types: pokemon.types
    }
}

// function displayList(pokemons, e) {
//     let pokemonList = pokemons.map((pokemon, i) => pokemon.name).join('<br><li>')
//     document.querySelector(".pokemon-list").innerHTML = `
//             <ul>
//                 <li>${pokemonList}</li>
//             </ul>
//         `
//     e.preventDefault();
//     return { pokemonList }

// }