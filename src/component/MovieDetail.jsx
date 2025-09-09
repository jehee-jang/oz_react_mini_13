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

    if (loading) return <div className="relative min-h-screen flex items-center justify-center px-4 py-12" style={{padding:16}}>불러오는 중…</div>;
    if (err) return <div className="relative min-h-screen flex items-center justify-center px-4 py-12 text-red-500" style={{padding:16, color:"red"}}>{err}</div>;
    if (!movie) return null;

    const backdropUrl = img(movie.backdrop_path, 1280);
    const posterUrl   = img(movie.poster_path, 780);
    const deg = `${(movie.vote_average / 10) * 360}deg`;

    return (
    <div className="relative min-h-screen">
        {backdropUrl && (
        <img className="fixed inset-0 -z-10 pointer-events-none w-full h-full object-cover opacity-30" src={backdropUrl} alt={movie.title} />
        )}

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-14">
            <div className="flex flex-row flex-wrap gap-6 md:gap-10 items-start justify-center md:justify-start sm:flex-col md:flex-row">
            <div className='poster flex-shrink-0'>
                <img  className="w-64 sm:w-72 md:w-80 lg:w-[350px] rounded-[10px] shadow-lg" src={posterUrl} alt={movie.title} />
            </div>
            <div className="max-w-2xl text-center md:text-left ">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">{movie.title}</h2>
                <p className=" 
                w-12 h-12 sm:w-[50px] sm:h-[50px] mb-4 rounded-full grid place-items-center
                text-white font-bold leading-none
                [background:radial-gradient(circle_at_50%_50%,#0b1c20_60%,transparent_61%),conic-gradient(green_var(--deg),transparent_0),radial-gradient(circle_at_50%_50%,#0f2a2e_0_62%,transparent_63%)]" 
                style={{"--deg": deg }}>
                    {movie.vote_average?.toFixed(1)}
                </p>
                <br/>
                <p className="mb-3 text-base sm:text-lg">
                    <span className="font-semibold">장르</span> :{" "}
                    {Array.isArray(movie.genres) ? movie.genres.map((g) => g.name).join(", ") : "-"}
                </p>
                <br/>
                <div className="space-y-2">
                <p className="text-lg sm:text-xl font-semibold">줄거리:</p>
                <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line">{movie.overview}</p>
                </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default MovieDetail;


//   fixed     /* 스크롤해도 계속 깔리게 하려면 fixed, 섹션 안에만이면 absolute */
//  inset-0            /* top/right/bottom/left 모두 0 */
//  -z-10            /* 콘텐츠 뒤로 */
//  pointer-events-none  /* 클릭 이벤트 막지 않게 */
//   object-cover     /* 비율 유지하며 꽉 채우기 */
//   opacity-30          /* 여기서 투명도 조절 */