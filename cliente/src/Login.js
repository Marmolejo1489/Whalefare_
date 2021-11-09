import React, { useState } from 'react';
import Axios from 'axios';

function Login() {

    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");

    const [loginStatus, setLoginStatus] = useState("");

    const logUser = () => {
        Axios.post("http://localhost:4000/login", {
            pass_u: Password,
            email_u: Email
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message);
            } else {
                setLoginStatus("Bienvenido, " + response.data[0].user_u);
            }
            
        });
    };

    return (

        <div className="containerr2">

            <h1>Iniciar sesión</h1>
            <div className="container">
                <label>Correo electrónico</label>
                <div className="input-container">
                    <input type="email" className="text_area" placeholder="Escribe aquí."
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }} />
                </div>
                <label>Contraseña</label>
                <div className="input-container">
                    <input type="password" className="text_area" placeholder="Escribe aquí."
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }} />
                </div>

                <div className="btn btn-primary" onClick={logUser}>Iniciar sesión</div>

                <p>¿No tienes una cuenta?</p>
                <p><a className="link" href="/signup">Crea una</a></p>
                <div className="container"></div>
            </div>

            <h1>{loginStatus}</h1>


        </div>

    )
}

export default Login;