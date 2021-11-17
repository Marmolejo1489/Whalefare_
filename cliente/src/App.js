import React, { useState, useEffect, useRef, } from 'react'
import Axios from 'axios';
import Home from './Home';
import Profile from './Profile';
import NotFound from './NotFound';
import Sign from './Sign';
import Nav from './Nav'
/*
import Add from './Add';
import Alert from './components/Alert';
*/
import Generador from './Generador';
import { createBrowserHistory } from 'history'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect

} from 'react-router-dom'
function App() {

    const [isLogged, setIsLogged] = useState();

    const check = () => {
        Axios.get('http://localhost:4000/profile').then((response) => {
            if (response.data.loggedIn) {
                setIsLogged(response.data.loggedIn)
            } else {
                setIsLogged(false)
            }
        });
    }

    const mounted = useRef();
    useEffect(() => {
        if (!mounted.current) {
            check();
            mounted.current = true;
        } else {
            check();
        }
    });


    Axios.defaults.withCredentials = true;

    return (
        <Router history={createBrowserHistory}>
            <Nav />

            <Switch>
                <Route path="/sign">

                    <Sign />

                </Route>
                <Route path="/home">
                    <div className="container">
                        {
                            isLogged === true ?
                                <Home />
                                :
                                <Redirect to={{ pathname: '/' }} />
                        }
                    </div>
                </Route>
                <Route path="/generar">
                    <Generador />
                </Route>
                <Route path="/profile">
                    <div className="container">
                        {
                            isLogged === true ?
                                <Profile />
                                :
                                <Redirect to={{ pathname: '/' }} />
                        }
                    </div>
                </Route>
                <Route path="/" exact>
                    <div className="container">
                        {//<LoggedRoute path="/landing" Component={Profile} isAuth={isLogged} />
                        }
                    </div>
                </Route>
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}
/*
return(
        <header>
            <ul>
                <li><a href="/"><b>WHALEFARE</b></a></li>
                <li><a href="github.com" aria-label="Haz clic aquí para iniciar sesión."><b>Iniciar sesión</b></a></li>
                <li><a href="github.com" className="active"
                       aria-label="Haz clic aquí para registrarte."><button><b>Registrarse</b></button></a></li>
            </ul>
        </header>
    );
*/

export default App;