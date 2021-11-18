import React, {useState, useEffect} from 'react';

import './App.css';

const fetchPokemonsUrl = "https://pokeapi.co/api/v2/pokemon?limit=10";

function App() {
  const [pokemons, setPokemons] = useState();
  const [imgURL, setImgURL] = useState("");
  const [pokemonName, setPokemonName] = useState("bulbasaur");

  const getPokemons = async () => {
    const response = await fetch(fetchPokemonsUrl);
    const responseJson = await response.json();
    setPokemons(responseJson.results);
  }

  const getPokemon = async (pokemon = "bulbasaur") => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const responseJson = await response.json();
    setImgURL(responseJson.sprites.other.home.front_default);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await getPokemon(e.target.value);
    setPokemonName(e.target.value);
  }

  useEffect(() => {
    getPokemons();
    getPokemon();
  }, [])

  return (
    <div className="app">
      <div className="navbar">
        <img src="images/pokeball.png" alt="logo" />
        <h1>pokémon.app</h1>
      </div>

      <main>
        <form className="pokemons" >
          {pokemons && pokemons.map((pokemon, idx) => {
            return(
              <input 
                key={idx}
                type="button"
                value={pokemon.name}
                onClick={handleFormSubmit}
              />
            );
          })}
        </form>
        <div className="pokemon">
          <img src={imgURL} alt="pokemonLogo" />
          <h2>{pokemonName}</h2>
        </div>
      </main>
    </div>
  );
}

export default App;
