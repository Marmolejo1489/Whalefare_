import React, { useState } from 'react';
import Axios from 'axios';

function Login() {

    const [Password, setPassword] = useState("");
    const [User, setUser] = useState("");
    const [Email, setEmail] = useState("");

    const addUser = () => {
        Axios.post("http://localhost:4000/login", {
            name_u: User,
            pass_u: Password,
            email_u: Email
        });

    };

    return (

        <div class="containerr2">
            <form >
                <h1>Iniciar sesión</h1>
                <div class="container">
                    <label>Nombre de usuario</label>
                    <div class="input-container">
                        <input type="text" id="pass" class="text_area" placeholder="Escribe aquí."
                            onChange={(event) => {
                                setUser(event.target.value);
                            }} />
                    </div>
                    <label>Correo electrónico</label>
                    <div class="input-container">
                        <input type="email" id="pass" class="text_area" placeholder="Escribe aquí."
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }} />
                    </div>
                    <label>Contraseña</label>
                    <div class="input-container">
                        <input type="password" id="pass" class="text_area" placeholder="Escribe aquí."
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }} />
                    </div>

                    <div class="button text-center" onClick={addUser}>Iniciar sesión</div>

                    <p>¿No tienes una cuenta?</p>
                    <p><a class="link" href="/signup">Crea una</a></p>
                    <div class="container"></div>
                </div>
            </form>
        </div>

    )
}

export default Login;