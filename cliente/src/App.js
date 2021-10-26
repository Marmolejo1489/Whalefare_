import React, { useEffect, useState } from 'react'
import Add from './Add'
import Axios from 'axios';
import Password from './Password';
import Login from './Login';
import Signup from './Signup';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from 'react-router-dom'

function App() {
    const [passwordList, setPasswordList] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:4000/home').then((response) => {
            setPasswordList(response.data);
        })
    }, []);

    const decryptedPassword = (encryption) => {
        Axios.post('http://localhost:4000/decryptpass', { password: encryption.password, iv: encryption.iv }).then((response) => {
            setPasswordList(passwordList.map((val) => {
                return val.id_c === encryption.id ? { id: val.id_c, pass_c: val.pass_c, nombre: response.data, website_c: val.website_c, name_u: val.user_c, iv: val.key_c } : val;
            }));
        });
    };

    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid ">
                    <div className="navbar-brand mx-5">WHALEFARE</div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-5">
                            <li className="nav-item">
                                <div className="nav-link" aria-current="page"><NavLink to="/home" activeClassName="active">Home</NavLink></div>
                            </li>
                            <li className="nav-item">
                                <div className="nav-link" aria-current="page"><NavLink to="/login" activeClassName="active">Iniciar sesión</NavLink></div>
                            </li>
                            <li className="nav-item">
                                <div className="nav-link" aria-current="page"><NavLink to="/signup" activeClassName="active">Registrarme</NavLink></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Switch>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/signup">
                    <Signup/>
                </Route>
                <Route path="/home">
                    <div className="Passwords">
                        <div className="container p-4">
                            <div className="row row-cols-3">
                                {passwordList.map((val, key) => {
                                    return (
                                        <div key={key} onClick={() => { decryptedPassword({ password: val.pass_c, iv: val.key_c, id: val.id_c }) }}>
                                            <Password {...val} />
                                            <br />
                                        </div>
                                    )
                                })}
                                <Add />
                            </div>
                        </div>
                    </div>
                </Route>
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