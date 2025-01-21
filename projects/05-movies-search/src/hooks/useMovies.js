/*
  Este custom hook sirve como caja negra para obtener las películas
  de la API de Imdb. La idea es que el componente App no sepa de donde
  vienen las películas, solo que las tiene que renderizar.
  Por eso, el custom hook se encarga de hacer la llamada a la API y
  devolver las películas ya mapeadas.

  Este hook tambien podria encapsular y
  devolver el loading, error, etc. 
  que se necesite para mostrar en el App
*/
import { useRef, useState } from "react";
import { searchMovies } from "../services/movies";

export function useMovies({ search }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const previousSearch = useRef(search); // Guarda el search anterior (usamos useRef porque el valor se mantiene entre renders)

  const getMovies = async () => {
    if (search == previousSearch.current) return; // Evita la llamada a la API si el search no cambió

    try {
      setLoading(true);
      const movies = await searchMovies({ search });
      previousSearch.current = search; // Actualiza el search anterior
      setMovies(movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { movies, getMovies, loading };
}
