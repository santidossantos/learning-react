import "./App.css";
import { Movies } from "./components/Movies";
import { useState, useEffect } from "react";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";

function App() {
  const { search, updateSearch, error } = useSearch();
  const [sort, setSort] = useState(false);
  const { movies, getMovies, loading } = useMovies({ search, sort });

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };

  const handleChange = (event) => {
    updateSearch(event.target.value);
  };

  /* Este useEffect lo utilizamos para ver que se esta creando la funcion getMovies
    Cada vez que escribimos en el input, se recrea la funcion getMovies
    Con use memo lo solucionamos 
  */
  useEffect(() => {
    console.log("Se crea la funcion getMovies");
  }, [getMovies]);

  return (
    <div className="page">
      <header>
        <h1>Buscador de Películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            value={search}
            onChange={handleChange}
            type="text"
            placeholder="Avengers, Star Wars..."
          />

          <input
            type="checkbox"
            checked={sort}
            onChange={() => setSort(!sort)}
          />

          <button type="submit">Buscar</button>
        </form>
        {error && <p className="error">{error}</p>}
        {loading && <p className="loading">Cargando...</p>}
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
