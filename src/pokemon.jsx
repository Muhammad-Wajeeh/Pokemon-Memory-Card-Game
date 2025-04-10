import { useEffect, useState } from "react";
import "./pokemon.css";
import { Pokemon } from "./pokemonClass";

function FetchPokemon({
  pokemonList,
  setPokemonList,
  score,
  setScore,
  highscore,
  setHighscore,
}) {
  async function fetchPokeList() {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
      const data = await res.json();

      const detailedData = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return await res.json();
        })
      );

      const newList = detailedData.map(
        (poke) => new Pokemon(poke.name, poke.sprites.front_default, false)
      );
      setPokemonList(newList); // just once
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchPokeList();
  }, [setPokemonList]);

  function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  function handleClick(pokeName) {
    const updatedList = pokemonList.map((p) => {
      if (p.name === pokeName) {
        console.log(`🔥 ${p.name} was clicked! clicked=${p.clicked}`);
        if (p.clicked) {
          if (score > highscore) setHighscore(score);
          setScore(0);
          fetchPokeList();
          return p; // don't modify again
        }

        setScore((prev) => prev + 1);
        return new Pokemon(p.name, p.img, true); // pass clicked = true
      }
      return p;
    });

    const shuffledList = shuffle([...updatedList]);
    console.log("shuffledList", shuffledList); // 🔍 verify clicked=true
    setPokemonList(shuffledList);
  }

  return (
    <>
      <div id="title">PokeMem</div>
      <div className="scores">
        <div id="score">Score: {score}</div>
        <div id="highscore">Highscore: {highscore}</div>
      </div>

      <div className="pokemon">
        {pokemonList.map((pokemon, index) => (
          <button
            className="pokeButtons"
            key={index}
            onClick={() => handleClick(pokemon.name)}
          >
            <img src={pokemon.img} alt={pokemon.name} />
          </button>
        ))}
      </div>

      <div id="instructions">
        How to Play: Select as many pokemon in a row as possible without
        selecting the same one. The max Score is 20.
      </div>
    </>
  );
}

export default FetchPokemon;
