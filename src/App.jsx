import { useState } from "react";
import MovieCard from "./component/MovieCard";
import movieListData from "./assets/data/movieListData.json"
import { Routes, Route } from "react-router-dom";
import MovieDetail from "./component/MovieDetail";
import './App.css'
import Layout from "./component/Layout";


function List() {
  const [movies] = useState(movieListData.results);

  return (
    <div className="app">
      <h1>영화 목록</h1>
        <div className="movie-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              voteaverage={movie.vote_average}
              posterUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
          ))}
        </div>
    </div>
  );
}
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<List />} />
        <Route path= {'detail/:id'} element={<MovieDetail/>}/>
      </Route>
    </Routes>
  );
}

export default App;
