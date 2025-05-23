import { useEffect, useState } from 'react'
import './App.css'
import FetchPokemon from './pokemon.jsx'

function App() {

  const [pokemonList, setPokemonList] = useState([]);
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);

  return(
    <div><FetchPokemon pokemonList={pokemonList} setPokemonList = {setPokemonList} score = {score} setScore = {setScore} highscore = {highscore} setHighscore = {setHighscore}/></div>
  )

}

export default App;
