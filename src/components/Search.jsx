import React from "react";
import "./Search.css";
const Search = ({ onSearch, types, handleSort, filterType }) => {
  return (
    <div className="search_container">
      <div className="form_field">
        <label htmlFor="name">Nome </label>
        <input
          type="text"
          name="name"
          placeholder="Buscar Pokémon..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="form_field">
        <label htmlFor="sort">Sort</label>
        <select
          name="sort"
          id="sort"
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="All">All</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
      </div>
      <div className="form_field">
        <label htmlFor="type"></label>
        <select
          name="type"
          id="type"
          onChange={(e) => filterType(e.target.value)}
        >
          <option value="All">Selecione o tipo</option>
          {types &&
            types.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default Search;
