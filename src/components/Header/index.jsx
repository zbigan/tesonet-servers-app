import React from 'react';
import { useAuth } from "../../context/auth";
import "./style.css";


const Header = () => {
    const { setAuthToken, authToken } = useAuth();

    function logOut() {
        setAuthToken();
    }
    
    return <div className="Header">
        <div className="Blank"></div>
        <div className="Title"><h2>Servers</h2></div>
        <div className="Blank">
            { authToken && authToken !== "undefined" && <button className="Header-element-end" onClick={logOut}>Log Out</button> }
        </div>
    </div>
}

export default Header;