import React, { useState } from "react";
import {hot} from "react-hot-loader";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import ServersPage from "./pages/ServersPage";
import Header from "./components/Header";
import { AuthContext } from "./context/auth";
import PrivateRoute from "./PrivateRoute";


const App = (props) => {
    const existingToken = localStorage.getItem("token");
    const [authToken, setAuthToken] = useState(existingToken);

    const setToken = (data) => {
        localStorage.setItem("token", data);
        setAuthToken(data);
    }


    return (
        <AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
            <BrowserRouter>
                <div className="App">
                    <Header/>
                    <Route exact path="/" component={LoginPage} />
                    <PrivateRoute path="/servers" component={ServersPage} />
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    )
};

export default hot(module)(App);
