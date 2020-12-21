import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { useAuth } from "../../context/auth";
import { SERVERS_ENDPOINT } from "../../utils/variables";
import "./style.css";
import { stateReducer } from "./utils";


const initialState = {
    servers: [],
    sortedBy: '',
    isSortedAscending: false
}


const ServersPage = () => {
    const [reload, toggleReload] = useState(false);
    const [state, dispatch] = useReducer(stateReducer, initialState);
    const [isError, setIsError] = useState(false);
    const { setAuthToken, authToken } = useAuth();

    useEffect(() => {
        axios.get(SERVERS_ENDPOINT, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
        })
        .then(result => {
            if (result.status === 200) {
                dispatch({ type: 'SET_SERVERS', value: result.data })
            } else {
                setIsError(true);
            }
        })
        .catch(err => setIsError(true));
    }, [reload]);


    function logOut() {
        setAuthToken();
    }

    return (
        <>
            <div className="Table">
                <div className="Table-cell">
                    <button onClick={() => toggleReload(!reload)}>Fetch new data</button>
                    <button onClick={logOut}>Log Out</button>
                </div>
            </div>
            <div className="Table">
                <h2>Column oriented table</h2>
            </div>
            <div className="Table Table-2cols">
                <div style={{order:1}} className="Table-cell Table-header">
                    <button
                        onClick={() => dispatch({ type: 'SORT_BY_NAME' })}
                        className="Button-header"
                    >
                        <h3>
                            {`Name ${state.sortedBy === 'name' ? (state.isSortedAscending ? '↑' : '↓') : ''}`}
                        </h3>
                    </button>
                </div>
                {
                    state.servers.map((server, index) => (
                        <div key={index} style={{order:index+2}} className="Table-cell">{server.name}</div>
                    ))
                }
                <div style={{order:1}} className="Table-cell Table-header">
                    <button
                        className="Button-header"
                        onClick={() => dispatch({ type: 'SORT_BY_DISTANCE' })}
                    >
                        <h3>
                            {`Distance ${state.sortedBy === 'distance' ? (state.isSortedAscending ? '↑' : '↓') : ''}`}
                        </h3>
                    </button>
                </div>
                {
                    state.servers.map((server, index) => (
                        <div key={index} style={{order:index+2}} className="Table-cell">{server.distance}</div>
                    ))
                }
            </div>
            { isError && <div>Ooops, failed to fetch data :(</div>}
        </>
    )
}

export default ServersPage;
