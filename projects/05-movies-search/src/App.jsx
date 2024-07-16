import './App.css'
import responseMovies from './mocks/with-results.json'
import withoutResults from './mocks/no-results.json'

function App () {
  const movies = responseMovies?.Search
  const hasMovies = movies?.length > 0

  return (
    <div className='page'>

      <header>
        <h1>Buscador de Películas</h1>
        <form className='form'>
          <input type='text' placeholder='Avengers, Star Wars...' />
          <button type='submit'>Buscar</button>
        </form>
      </header>

      <main>

        {hasMovies
          ? (
            <ul>
              {
               movies.map((movie) => (
                 <li key={movie.imdbID}>
                   <img src={movie.Poster} alt={movie.Title} />
                   <h2>{movie.Title}</h2>
                   <p>{movie.Year}</p>
                 </li>
               ))
            }
            </ul>
            )
          : (
            <p>No se encontraron resultados</p>
            )}

      </main>

    </div>
  )
}

export default App
