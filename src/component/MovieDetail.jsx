import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BASE_URL = "https://api.themoviedb.org/3";

const img = (path, w = 1280) =>
    path ? `https://image.tmdb.org/t/p/w${w}${path}` : "";

function MovieDetail() {
    const { id } = useParams();                
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    useEffect(() => {
        let ignore = false;

        async function fetchDetail() {           
        try {
            setLoading(true);
            const res = await fetch(`${BASE_URL}/movie/${id}?language=ko-KR`, {
            headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
        },
        });
        if (!res.ok) throw new Error("Failed to fetch movie detail");
        const data = await res.json();
        if (!ignore) setMovie(data);
        } catch (e) {
        if (!ignore) setErr(e.message || "Error");
        } finally {
        if (!ignore) setLoading(false);
        }
    }

    fetchDetail();
    return () => { ignore = true; };
    }, [id]);

    if (loading) return <div className="detail-page" style={{padding:16}}>불러오는 중…</div>;
    if (err) return <div className="detail-page" style={{padding:16, color:"red"}}>{err}</div>;
    if (!movie) return null;

    const backdropUrl = img(movie.backdrop_path, 1280);
    const posterUrl   = img(movie.poster_path,   780);
    const deg = `${(movie.vote_average / 10) * 360}deg`;

    return (
    <div className="detail-page">
        <div className="backdrop-layer">
        <img className='backdrop' src={backdropUrl} alt={movie.title} />
        <div className="backdrop-overlay" />
        </div>
        <div className="movie-detail-main">
            <div className='poster'>
                <img src={posterUrl} alt={movie.title} />
            </div>
            <div className="info">
                <h2 className="title">{movie.title}</h2>
                <p className="voteaverage" style={{ 
                    background: `
                    radial-gradient(circle at 50% 50%, #0b1c20 60%, transparent 61%),
                    conic-gradient(green ${deg}, transparent 0),
                    radial-gradient(circle at 50% 50%, #0f2a2e 0 62%, transparent 63%)` 
                    }}>{movie.vote_average?.toFixed(1)}</p>
                <p className="genres">장르 : {movie.genres.map((g) => g.name).join(", ")}</p>
                <p className="overview">줄거리: <br/>{movie.overview}</p>
            </div>
        </div>
    </div>
    );
}

export default MovieDetail;