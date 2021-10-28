import React, { useState } from 'react';
import Axios from 'axios';

function Signup() {

    const [Password, setPassword] = useState("");
    const [User, setUser] = useState("");
    const [Email, setEmail] = useState("");

    const addUser = () => {
        Axios.post("http://localhost:4000/signup", {
            user_u: User,
            pass_u: Password,
            email_u: Email
        });

    };

    return (

        <div className="containerr2">
            <form >
                <h1>Registrarme</h1>
                <div className="container">
                    <label>Nombre de usuario</label>
                    <div className="input-container">
                        <input type="text"  className="text_area" placeholder="Escribe aquí."
                            onChange={(event) => {
                                setUser(event.target.value);
                            }} />
                    </div>
                    <label>Correo electrónico</label>
                    <div className="input-container">
                        <input type="email"  className="text_area" placeholder="Escribe aquí."
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }} />
                    </div>
                    <label>Contraseña</label>
                    <div className="input-container">
                        <input type="password"  className="text_area" placeholder="Escribe aquí."
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }} />
                    </div>

                    <div className="button text-center" onClick={addUser}>Crear cuenta</div>

                    <p>¿Ya tienes una cuenta?</p>
                    <p><a className="link" href="/login">Inicia sesión</a></p>
                    <div className="container"></div>
                </div>
            </form>
        </div>

    )
}

export default Signup;