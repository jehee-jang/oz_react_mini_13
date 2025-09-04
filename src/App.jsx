import MovieCard from "./component/MovieCard";
import movieListData from "./assets/data/movieListData.json"
import { Routes, Route } from "react-router-dom";
import MovieDetail from "./component/MovieDetail";
import './App.css'
import Layout from "./component/Layout";

import 'swiper/css';
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";


function List() {
  
  return (
    <div className="app">
      <h1>영화 목록</h1>
    <Swiper
    modules={[Navigation]}// 사용할 모듈
    spaceBetween={16}// 슬라이드 사이 간격
    slidesPerView={5}// 슬라이드 한 화면에 몇개 보여줄건지
    navigation // 좌우 버튼 활성화
  >
    {movieListData.results.map((movie) => (
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

export default App;
