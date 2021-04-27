import {Link} from "react-router-dom";

const Header = () => {
    return (
        <>
        <h1>Panalty Chess</h1>
        <ul className="nav">
            <li>
                <Link to="/">Home</Link>
            </li>
            
            <li>
                <Link to="/chessgame">ChessBoard</Link>
            </li>
            
            <li>
                <Link to="/leaderboard">LeaderBoard</Link>
            </li>
        </ul>
        </>
        );
}

export default Header;