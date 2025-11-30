import React from "react";
import Pokemon from "./Pokemon";
import "./PokemonCard.css";

const PokemonCard = ({ pokemonsList, types }) => {
  const typeColors = {
    fire: "#F08030",
    water: "#6890F0",
    grass: "#78C850",
    electric: "#F8D030",
    psychic: "#F85888",
    ice: "#98D8D8",
    dragon: "#7038F8",
    dark: "#705848",
    fairy: "#EE99AC",
    normal: "#A8A878",
    fighting: "#C03028",
    flying: "#A890F0",
    poison: "#A040A0",
    ground: "#E0C068",
    rock: "#B8A038",
    bug: "#A8B820",
    ghost: "#705898",
    steel: "#B8B8D0",
  };

if (!pokemonsList || pokemonsList.length === 0) {
  return <p className="not_found">Nenhum Pokémon encontrado.</p>;
}

  return (
    <div className="card_container">
      {pokemonsList.map((pokemon) => {

        return (
          <Pokemon key={pokemon.id} pokemon={pokemon} typeColors={typeColors} types={types}/>
        );
      })}
    </div>
  );
};

export default PokemonCard;
