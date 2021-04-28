import {Link} from "react-router-dom";

function Header ({isLoggedIn}){
    
    return (
        <>
        <h1>Panalty Chess</h1>
        <ul className="nav">
            <li>
                <Link to="/">Home</Link>
            </li>
            
            <li>
                <Link to="/gameroom">Game Room</Link>
            </li>
            
            <li>
                <Link to="/leaderboard">LeaderBoard</Link>
            </li>
            <li>
                <Link to="/profile">Profile</Link>
            </li>
            {
                !isLoggedIn ? 
                <Link to="/login">Log In</Link>
                :
                null
            }
        </ul>
        </>
        );
}

export default Header;