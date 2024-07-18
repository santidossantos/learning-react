/* eslint-disable react/prop-types */
/*
    The Movies component receives a prop called movies.
    If the movies array has at least one element, it renders the ListMovies component.
    Otherwise, it renders the NoResults component.
    La idea es exportar la función Movies que ya hace la logica de renderizar
    los componentes ListMovies y NoResults segun corresponda.
    Estaria MAL hacer las funciones ListMovies y NoResults dentro del App por ejemplo,
    ya que cada vez que se renderiza el app se vuelven a crear las funciones.
    Por eso esto es una buena practica y un componente.

    Tambien estaria mal poner:
        <li key={movie.imdbID}>
          <h2>{movie.Title}</h2>
          <p>{movie.Year}</p>
          <img src={movie.Poster} alt={movie.Title} />
        </li>

    Ya que estariamos atando el componente a la API de ImbDB.
    Es mejor hacer el mapeo afuera y que el componente reciba
    un array de objetos con las propiedades ya mapeadas
*/

function ListMovies ({ movies }) {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.year}</p>
          <img src={movie.poster} alt={movie.title} />
        </li>
      ))}
    </ul>
  )
}

function NoResults () {
  return (
    <p>No se encontraron resultados</p>
  )
}

export function Movies ({ movies }) {
  const hasMovies = movies?.length > 0

  return (
    <main>
      {hasMovies
        ? <ListMovies movies={movies} />
        : <NoResults />}
    </main>
  )
}
