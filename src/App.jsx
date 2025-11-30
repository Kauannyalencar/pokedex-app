import Axios from "axios";
import "./App.css";
import Header from "./components/Header";
import { useEffect, useState, React } from "react";
import Search from "./components/Search";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState([]);
  const [filter, setFilter] = useState([]);
  const [types, setTypes] = useState([]);

  async function fetchPokemons(url) {
    const response = await Axios.get(url);
    const results = response.data.results;

    const detailedPokemons = await Promise.all(
      results.map((pokemon) => Axios.get(pokemon.url).then((res) => res.data))
    );

    setPokemons((prev) => [...prev, ...detailedPokemons]);
  }

  useEffect(() => {
    fetchPokemons(
      `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
    );
  }, [offset]);

  useEffect(() => {
    Axios.get("https://pokeapi.co/api/v2/type").then((res) => {
      const typeList = res.data.results.map(
        (type) => type.name.charAt(0).toUpperCase() + type.name.slice(1)
      );

      setTypes(typeList);
    });
  }, []);

  function handleSearch(busca) {
    setSearch(busca);

    if (busca.trim() === "") {
      setFilter([]);
      return;
    }

    const filteredPokemons = pokemons.filter((poke) =>
      poke.name.toLowerCase().includes(busca.toLowerCase())
    );

    setFilter(filteredPokemons);
  }

  function handleSort(sorted) {
    if (sorted == "All") {
      setSort([]);
      return;
    }
    const arrayToSort = filter.length > 0 ? [...filter] : [...pokemons];

    const sortedPokemons = arrayToSort.sort((a, b) => {
      console.log("A" + a.name, b);

      return sorted === "A-Z"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
    setSort(sortedPokemons);
  }

  function filterType(type) {
    if (type === "All") {
      setFilter([]);
    }

    const typeFormat = type.toLowerCase();

    const filteredPokemons = pokemons.filter((poke) =>
      poke.types.some((typeSlot) => typeSlot.type.name === typeFormat)
    );
    console.log(filteredPokemons);

    setFilter(filteredPokemons);
  }

  return (
    <div className="app">
      <Header />
      <Search
        onSearch={handleSearch}
        types={types}
        handleSort={handleSort}
        filterType={filterType}
      />
      <PokemonCard
        pokemonsList={
          filter.length > 0? (sort.length > 0 ? sort : filter) :(sort.length > 0 ? sort : pokemons)
        }
        types={types}
      />
      <button
        type="button"
        className="carregar_mais"
        onClick={() => setOffset((prev) => prev + 20)}
      >
        Carregar mais
      </button>
    </div>
  );
}

export default App;
