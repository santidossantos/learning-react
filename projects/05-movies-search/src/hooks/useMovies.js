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
import { useMemo, useRef, useState } from "react";
import { searchMovies } from "../services/movies";

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const previousSearch = useRef(search); // Guarda el search anterior (usamos useRef porque el valor se mantiene entre renders)

  const getMovies = useMemo(() => {
    return async ({ search }) => { // Inyectamos el parametro search
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
  }, []); // Dependencia vacia porque la funcion solo se debe crear una vez

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) // Hacemos una copia para no mutar el estado
      : movies; // En algunos idiomas, los acentos pueden influir en el orden de las letras.
  }, [sort, movies]); // Dependencias para recalcular el orden cuando cambian

  return { movies: sortedMovies, getMovies, loading };
}
