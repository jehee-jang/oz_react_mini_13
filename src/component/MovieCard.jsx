import { useNavigate } from "react-router-dom";

function MovieCard({ id, title, voteaverage, backdropUrl }) {
    const navigate = useNavigate()
    return (
    <div className="flex justify-center min-h-screen px-4">
    <div onClick={() => navigate(`/detail/${id}`)} className=" p-2.5 text-center overflow-hidden w-full sm:w-[80%] md:w-[70%] lg:w-[60%] h-auto">
        <img className="rounded-lg w-full block aspect-video object-cover" src={backdropUrl} alt={title} />
        <h2 className="text-lg sm:text-xl md:text-2xl mt-2 mb-1 font-bold">{title}</h2>
        <p className="text-base sm:text-lg md:text-xl mb-2">{voteaverage}</p>
    </div>
    </div>
    );
}

export default MovieCard;

// aspect-video -> 16:9 비율 유지
//  object-cover -> 넘치는 부분 자름