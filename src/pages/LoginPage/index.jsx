import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { useAuth } from "../../context/auth";
import { LOGIN_ENDPOINT } from "../../utils/variables";
import "./style.css";


const LoginPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setAuthToken } = useAuth();

    function doLogin({ username='', password='' }) {
        axios.post(LOGIN_ENDPOINT, {
            username,
            password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        })
        .then(result => {
            if (result.status === 200) {
                setAuthToken(result.data?.token);
                setIsLoggedIn(true);
            } else {
                setIsError(true);
            }
        })
        .catch(e => {
            setIsError(true);
        });
    }

    if (isLoggedIn) {
        return <Redirect to="/servers" />;
    }


    return (
        <div className="Centered-container Login-form">
            <form action="" onSubmit={(e) => {
                e.preventDefault();
                doLogin({ username, password })
            }}>
                <label className="Form-label" htmlFor="username">Username:</label>
                <br/>
                <input className="Input-field" name="username" required value={username} onChange={(e) => setUsername(e.target.value)} type="text"/>
                <br/>
                <label className="Form-label" htmlFor="password">Password:</label>
                <br/>
                <input className="Input-field" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} type="password"/>
                <br/>
                <div className="Centered-container">
                    <button className="Login-button" type="submit">Log In</button>
                </div>
            </form>
            {
                isError && <div>Wrong username and/or password</div>
            }
        </div>
    )
}

export default LoginPage;
