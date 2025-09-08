import MovieCard from "./component/MovieCard";
import { Routes, Route } from "react-router-dom";
import MovieDetail from "./component/MovieDetail";
import './App.css'
import Layout from "./component/Layout";

import 'swiper/css';
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";


function List() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`
  },
};


fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
  .then(res => res.json())
  .then((data) => {
        const filtered = data.results.filter((m) => m.adult === false);
        setMovies(filtered);
      })
  .catch(err => console.error(err));
  }, []);
  
  return (
    <div className="app">
      <h1>영화 목록</h1>
    <Swiper
    modules={[Navigation]}// 사용할 모듈
    spaceBetween={16}// 슬라이드 사이 간격
    slidesPerView={5}// 슬라이드 한 화면에 몇개 보여줄건지
    navigation // 좌우 버튼 활성화
  >
    {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <MovieCard
            id={movie.id}
            title={movie.title}
            posterUrl={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            voteaverage={movie.vote_average}
          />
        </SwiperSlide>
      ))}
  </Swiper>
      
        
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
//<SwiperSlide key={movie.id}> 구분하는 식별자
//<Route index element={<List />} /> 부모 <Route> 안에서 기본 경로(default path)"를 설정한다는 의미

export default App;
