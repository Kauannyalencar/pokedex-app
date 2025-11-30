import { useState } from "react";
import "./PokemonCard.css";
import pokebola from "../img/pngwing.com.png";
import React from "react";

const Pokemon = ({ pokemon, typeColors, types }) => {
  const [isFlipped, setFlipped] = useState(false);
  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  return (
    <div className={`card ${isFlipped ? "flipped" : ""}`}>
      {!isFlipped ? (
        <>
          <span className="pokemon_index">
            N°{String(pokemon.id).padStart(3, "0")}
          </span>
          <div className="imgs_container">
            <img src={pokebola} className="back_card_img" />
            <img src={pokemon.sprites.front_default} className="poke_img" />
          </div>
          <div className="infor_front">
            <h3>{name}</h3>
            <ul className="type">
              {pokemon.types.map((types) => {
                const color = typeColors[types.type.name] || "#A8A878";
                const typeCase =
                  types.type.name.charAt(0).toUpperCase() +
                  types.type.name.slice(1);
                return (
                  <li key={types.type.name} style={{ backgroundColor: color }}>
                    {typeCase}
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      ) : (
        <div className="car_back">
          <h3>{pokemon.name}</h3>
          <p>
            <strong>Height:</strong> {pokemon.height}
          </p>
          <p>
            <strong>Weight:</strong> {pokemon.weight}
          </p>
          <p>
            <strong>Abilities:</strong>
          </p>
          <ul>
            {pokemon.abilities.map((ab) => (
              <li key={ab.ability.name}>{ab.ability.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Pokemon;
