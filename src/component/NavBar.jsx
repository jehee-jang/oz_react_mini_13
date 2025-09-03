import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav style={{ padding: 12, background: "#222" }}>
            <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "bold", color:"white"}}>OZ MOVIE</h1>
            <div style={{ display: "flex", justifyContent:'right', alignItems: "center", gap: "8px" }}>
            <input />
            <span style={{color: 'white'}}>검색</span>
            </div>
            <Link to='/' style={{ color: "#fff", marginRight: 12 }}>메인 페이지</Link>
            <Link to='/detail/:id' style={{ color: "#fff", marginRight: 12 }}>상세 페이지</Link>
        </nav>
    )
}