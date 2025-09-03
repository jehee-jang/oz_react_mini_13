import { useNavigate } from "react-router-dom";

function MovieCard({ id, title, voteaverage, posterUrl }) {
    const navigate = useNavigate()
    return (
    <div onClick={() => navigate(`/detail/${id}`)} className="movie-card">
        <img src={posterUrl} alt={title} />
        <h2>{title}</h2>
        <p>{voteaverage}</p>
    </div>
    );
}

export default MovieCard;