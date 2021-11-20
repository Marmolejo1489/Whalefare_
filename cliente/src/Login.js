import React, { useState } from 'react';
import { Alert } from 'reactstrap'
import { loginVal, } from './validation';
import ValidationModal from './ValidationModal';
import Axios from 'axios';
function Login() {

    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [modalType, setType] = useState("");
    const [modalOpen, setOpen] = useState(false);

    const logUser = () => {
        const user = {
            Password: Password,
            Email: Email,
        }

        modalVal();
        let type = {
            modalValType: loginVal(user)
        }
        console.log(type)
        setType(type)
        console.log(modalType)
        if (modalType === true) {
            Axios.post("http://localhost:4000/login", {
                password: Password,
                email: Email
            }).then((response) => {
                if (!response.data.loggedIn) {
                    //Aquí para poner qué credenciales son erróneas
                    console.log("Credenciales erróneas")

                    return;
                } else {
                    console.log(response)
                    console.log('Then ELse')
                }
            });
        } else {
            console.log(modalType)
            onShowAlert();
        }

    }

    const modalVal = () => {
        setOpen(!modalOpen)
    }

    const onShowAlert = () => {
        setOpen(true)
        const open = () => {
            window.setTimeout(() => {
                setOpen(false)
            }, 1000)
        };
        open();
    }
    return (
        <div>
            {
                <div className="containerr2">
                    <Alert color="info"
                        isOpen={modalOpen}
                    >
                        <ValidationModal {...modalType} />
                    </Alert>
                    <h1>Iniciar sesión</h1>
                    <div className="container">
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

                                }} />
                            <div id="p1">
                                {
                                    //Mensaje de error cuando las credenciales no coinciden
                                }
                            </div>
                        </div>
                        <div className="btn btn-primary" onClick={logUser}>Iniciar sesión</div>

                        <p>¿No tienes una cuenta?</p>
                        <p><a className="link" href="/signup">Crea una</a></p>
                        <div className="container"></div>
                    </div>
                </div>
            }
        </div>

    )
}

export default Login;