import React, { useState, useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useMovies } from '../Hooks/useMovies';
import { useSearchs } from '../Hooks/useSearch';
import { CurrentMovie } from './CurrentMovie';
import { Header } from './Header';
import { ListMovies } from './ListMovies';
import { MoviesContext } from '../Context/MovieProvide';

/**
 * @name MoviesList
 * @description Usa el Movie Context, hecho como muestra para el manejo de contextos y las envia al componente y contiene la barra y resultados de busqueda
 * @const useSearchs Es un Hook que devuelve los resultados de busqueda de la Api y los lista a cambio del contexto
 * @returns Retorna un ListMovies con la lista de peliculas del contexto por defecto o los resultados de bisqueda
 */

export function MoviesList() {
  const moviesContext = useContext(MoviesContext);

  const [keyword, setKeyword] = useState({ value: '&page=1' });
  const { loading } = useMovies(keyword);
  const movies = moviesContext.movies;

  const [showMovie, setShowMovie] = useState({ show: false, movie: {} });
  const { moviesSearch, handleSearch, setHandleSearch, setMoviesSearch } =
    useSearchs();

  const handleChange = (e) => {
    setHandleSearch(e.target.value);
  };

  const resetSearch = (e) => {
    setMoviesSearch({});
    setHandleSearch('');
  };

  return loading ? (
    <div>Cargando...</div>
  ) : (
    <>
      {showMovie.show ? (
        <CurrentMovie
          currentMovie={showMovie}
          onClose={(e) => setShowMovie({ show: false, movie: {} })}
        />
      ) : null}
      {keyword.value === '&page=1' ? <Header /> : ''}
      <form
        action=''
        className='relative w-6/12'
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          id='search-input'
          name='search'
          value={handleSearch}
          onChange={handleChange}
          type='text'
          placeholder='Que quieres ver...'
          className=' text-rojo h-6 border px-2 border-rojo w-full outline-none'
        />
        <FaSearch className='absolute right-3 top-1 text-rojo cursor-pointer' />
      </form>

      {moviesSearch.results ? (
        <>
          <button onClick={resetSearch} className='bg-rojo px-3 text-white'>
            Volver
          </button>
          <ListMovies
            resetSearch={resetSearch}
            movies={moviesSearch.results}
            setShowMovie={setShowMovie}
          />
        </>
      ) : (
        <>
          <ListMovies
            currentPage={movies.page}
            totalPages={movies.total_pages}
            movies={movies.results}
            setShowMovie={setShowMovie}
            setPage={setKeyword}
          />
        </>
      )}
    </>
  );
}
