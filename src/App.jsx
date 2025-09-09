import MovieCard from "./component/MovieCard";
import { Routes, Route, useSearchParams } from "react-router-dom";
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

  const [searchParams] = useSearchParams();
  const q = (searchParams.get("q") ?? "").trim();  

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
      },
    };

    const url = q
      ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          q
        )}&language=ko-KR&include_adult=false&page=1`
      : `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`;

    fetch(url, options)
      .then(async (res) => {
        if (!res.ok) {
          let msg = `HTTP ${res.status}`;
          try {
            const b = await res.json();
            msg = b.status_message || b.message || msg;
          } catch {}
          throw new Error(msg);
        }
        return res.json();
      })
      .then((data) => {
        const results = Array.isArray(data?.results) ? data.results : [];
        const filtered = results.filter((m) => m?.adult === false);
        setMovies(filtered);
      })
      .catch((err) => {
        console.error(err);
        setMovies([]);
      });
  }, [q]);
  
  return (
    <div className="app">
      <h1 className="font-bold text-2xl"> MOVIE{q && `- "${q}"`}</h1>
    <Swiper
    modules={[Navigation]}// 사용할 모듈
    spaceBetween={16}// 슬라이드 사이 간격
    slidesPerView={1}// 슬라이드 한 화면에 몇개 보여줄건지
    navigation // 좌우 버튼 활성화
  >
    {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <MovieCard
            id={movie.id}
            title={movie.title}
            backdropUrl={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
            voteaverage={movie.vote_average?.toFixed(2)}
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
