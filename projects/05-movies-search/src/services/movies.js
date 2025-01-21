const API_KEY = "4287ad07"; // Deberia estar en un archivo .env

/*
 Recibe un objeto con la propiedad search.
 El servicio es un buen lugar donde hacer el mapeo
    de los datos que vienen de la API.
 No deberia hacerse en el componente o en el hook.
*/

export const searchMovies = async ({ search }) => {
  if (search === "") return null;

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
    );
    const json = await response.json();

    const movies = json.Search;

    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }));
  } catch (e) {
    throw new Error("Error searching movies");
  }
};
