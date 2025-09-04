import { useState } from "react";
import movieDetailData from "../assets/data/movieDetailData.json"
import { useParams } from "react-router-dom";

function MovieDetail() {
    const [movie] = useState(movieDetailData)
    const backdropUrl = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    const posterUrl = `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
    const {id} = useParams()

    return (
    <div className="detail-page">
        <img className='backdrop' src={backdropUrl} alt={movie.title} />
        <div className="movie-detail-main">
            <div className='poster'>
                <img src={posterUrl} alt={movie.title} />
            </div>
            <div className="info">
                <h2 className="title">{movie.title}</h2>
                <p className="voteaverage">{movie.vote_average}</p>
                <p className="genres">{movie.genres.map((g) => g.name).join(", ")}</p>
                <p className="overview">{movie.overview}</p>
            </div>
        </div>
    </div>
    );
}

export default MovieDetail;