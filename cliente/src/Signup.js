import React, { useState } from 'react';
import { signupVal, safetyPass } from './validation'
import { Alert } from 'reactstrap'
import ValidationModal from './ValidationModal';
import Axios from 'axios';

function Signup() {

    const [Password, setPassword] = useState("");
    const [User, setUser] = useState("");
    const [Email, setEmail] = useState("");
    const [modalType, setType] = useState("")
    const [modalOpen, setOpen] = useState(false);

    const addUser = () => {
        const newUser = {
            Password: Password,
            User: User,
            Email: Email
        }
        modalVal();
        console.log("Form validation -> ", signupVal(newUser))
        let type = {
            modalValType: signupVal(newUser)
        }
        setType(type)
        if (modalType === true) {
            Axios.post("http://localhost:4000/signup", {
                username: User,
                password: Password,
                email: Email
            }).then((response) => {
                if (response.data.message) {
                    console.log(response.data.message);
                } else {
                    console.log("Estado de loggedIn -> " + response.data.loggedIn)
                }
            });
        } else {
            onShowAlert()
        }
        console.log("passSafety -> ", safetyPass(Password))
        /*
                
                */
    };

    const onShowAlert = () => {
        setOpen(true)
        const open = () => {
            window.setTimeout(() => {
                setOpen(false)
            }, 1000)
        };
        open();
    }

    const modalVal = () => {
        setOpen(!modalOpen)
    }

    return (
        <div className="containerr2">
            <Alert color="info"
                isOpen={modalOpen}
            >
                <ValidationModal {...modalType} />
            </Alert>
            <h1>Registrarme</h1>
            <div className="container">
                <label>Nombre de usuario</label>
                <div className="input-container">
                    <input type="text" className="text_area" placeholder="Escribe aquí." name="username"
                        onChange={(event) => {
                            setUser(event.target.value);
                        }} />
                </div>
                <label>Correo electrónico</label>
                <div className="input-container">
                    <input type="email" className="text_area" placeholder="Escribe aquí." name="email"
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }} />
                </div>
                <label>Contraseña</label>
                <div className="input-container">
                    <input type="password" id="Password" className="text_area" placeholder="Escribe aquí." name="password"
                        onChange={(event) => {
                            setPassword(event.target.value);
                            safetyPass(event.target.value);
                        }} />
                    <div id="p1"></div>
                </div>
                <button className="btn btn-primary" onClick={addUser}>Crear cuenta</button>
                <p>¿Ya tienes una cuenta?</p>
                <p><a className="link" href="/login">Inicia sesión</a></p>
                <div className="container"></div>
            </div>

        </div>

    )
}

export default Signup;