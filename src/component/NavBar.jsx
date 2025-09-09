import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";

export default function NavBar() {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();

    const inital = searchParams.get("q") ?? '';
    const [q, setQ] = useState(inital);
    const debounceQ = useDebounce(q, 300);

    useEffect(() => {
    const s = (debounceQ ?? "").trim();
    const current = (searchParams.get("q") ?? "").trim();

    if (s === current && (s ? location.pathname === "/" : true)) return;

    if (s) {
        if (location.pathname !== "/") {
            navigate({ pathname: "/", search: `?q=${encodeURIComponent(s)}` });
        } else {
        setSearchParams({ q: s });
        }
    } else {
        if (location.pathname !== "/") navigate("/"); // 빈 검색어면 루트로
        else setSearchParams({});
    }
    }, [debounceQ, location.pathname, navigate, searchParams, setSearchParams]);

    return (
        <nav className="flex flex-col md:flex-row items-center justify-between gap-3 px-4 py-2 bg-[#222]">
            <div className="flex items-center gap-4">
            <h1 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl">OZ PLAY</h1>
            <Link to='/' className="text-white text-base sm:text-lg">메인</Link>
            </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <input className="w-full md:w-80 border-2 border-gray-400 bg-white rounded px-3 py-2" value={q} onChange={(e) => setQ(e.target.value)}/>
                    <span className="text-white">검색</span>
                </div>
        </nav>
    )
}

const useDebounce = (value, delay) => {
    const [debounce, setDebounce] = useState(value)

    useEffect(() => {
    const id = setTimeout(() => setDebounce(value), delay);
    return () => clearTimeout(id);
    }, [value, delay]);

    return debounce;
};