import React, { useMemo, useState, useEffect } from 'react';
import Axios from 'axios';

import { AuthContext } from './Auth/AuthContext';
import RoutesManagement from './Router';

function App() {
    const [isLogged, setIsLogged] = useState({ isAuth: false, id: null });
    const [isLoading, setIsLoading] = useState(true)
    const providerUser = useMemo(() => ({ isLogged, setIsLogged }), [isLogged, setIsLogged])

    useEffect(() => {

        Axios.get('http://localhost:4000/jwt').then((response) => {
            console.log(response.data)
            setIsLogged({
                isAuth: response.data.isAuth,
                id: response.data.id
            });
            
        }).catch((err) => {
            console.log(err)
        })


    }, []);

    Axios.defaults.withCredentials = true;

    return (
        <AuthContext.Provider value={providerUser}>
            <RoutesManagement />
        </AuthContext.Provider>
    )
}

export default App;