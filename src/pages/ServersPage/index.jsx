import React from 'react';
import { useAuth } from "../../context/auth";

const ServersPage = () => {
    const { setAuthToken } = useAuth();

    function logOut() {
        setAuthToken();
    }

    return (
        <div>
            Servers Page
            <button onClick={logOut}>Log Out</button>
        </div>
    )
}

export default ServersPage;
