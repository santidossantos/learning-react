import responseMovies from '../mocks/with-results.json'

/*
  Este custom hook sirve como caja negra para obtener las películas
  de la API de Imdb. La idea es que el componente App no sepa de donde
  vienen las películas, solo que las tiene que renderizar.
  Por eso, el custom hook se encarga de hacer la llamada a la API y
  devolver las películas ya mapeadas.
*/

export function useMovies () {
  const movies = responseMovies?.Search

  const mappedMovies = movies?.map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster
  }))

  return { movies: mappedMovies }
}
