import React, { useState } from 'react';
/*
import {
    NavLink
} from 'react-router-dom'
*/
import Axios from 'axios';

function Password(val) {

    var [clicked, setClicked] = useState(true);
    const [Password, setPassword] = useState("");
    const [User, setUser] = useState("");
    const [Website, setWebsite] = useState("");
    const [Title, setTitle] = useState("");

    var boo = true;
    const hidePass = () => {
        if (boo) {
            document.getElementById("pass" + val.id_c).type = "text";
            document.getElementById("eye" + val.id_c).className = "fa fa-eye";
            boo = false;
        } else {
            document.getElementById("pass" + val.id_c).type = "password";
            document.getElementById("eye" + val.id_c).className = "fa fa-eye-slash";
            boo = true;
        }
    }

    const toEditPass = () => {
        if (clicked) {
            document.getElementById("btn0" + val.id_c).hidden = true;
            document.getElementById("btn1" + val.id_c).hidden = false;
            document.getElementById("pass" + val.id_c).disabled = false;
            document.getElementById("user" + val.id_c).disabled = false;
            document.getElementById("web" + val.id_c).disabled = false;
            document.getElementById("title" + val.id_c).disabled = false;
            setClicked(false);
        }
    }

    const editPass = (id_c) => {
        if (!clicked) {
            document.getElementById("btn0" + val.id_c).hidden = false;
            document.getElementById("btn1" + val.id_c).hidden = true;
            document.getElementById("pass" + val.id_c).disabled = true;
            document.getElementById("user" + val.id_c).disabled = true;
            document.getElementById("web" + val.id_c).disabled = true;
            document.getElementById("title" + val.id_c).disabled = true;
            setClicked(true);
            Axios.post("http://localhost:4000/edit/" + id_c, {
                title_c: Title,
                user_c: User,
                pass_c: Password,
                website_c: Website
            });
        }
    }

    const deletePass = (id_c) => {

        Axios.post("http://localhost:4000/delete/" + id_c);

    }

    /*
    Axios.get('http://localhost:4000/login').then((response) => {
            if (response.data.user) {
                var id_u = response.data.user[0].id_u;
                Axios.post('http://localhost:4000/home', { id_u: id_u }).then((response) => {
                    setPasswordList(response.data);
                });
            }
        });
    */

    return (

        <div className="col">
            <div className="card">
                <div className="container">
                    <label>Titulo</label>
                    <div className="mb-3 input-group">
                        <input id={"title" + val.id_c} className="form-control" disabled={true} defaultValue={val.title_c}
                            onChange={(event) => {
                                setTitle(event.target.value);
                            }} />
                    </div>
                    <label>Nombre de usuario</label>
                    <div className="mb-3 input-group">
                        <input name="" id={"user" + val.id_c} className="form-control" disabled={true} defaultValue={val.user_c}
                            onChange={(event) => {
                                setUser(event.target.value);
                            }} />
                    </div>
                    <label>Contraseña</label>
                    <div className="mb-3 input-group">
                        <input type="password" id={"pass" + val.id_c} className="form-control" disabled={true} defaultValue={val.password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />
                        <span onClick={hidePass} className="input-group-text"><i id={"eye" + val.id_c} className="fa fa-eye" aria-hidden="true"></i></span>
                    </div>
                    <label>Sitio web</label>
                    <div className="mb-3 input-group">
                        <input id={"web" + val.id_c} className="form-control" disabled={true} defaultValue={val.website_c}
                            onChange={(event) => {
                                setWebsite(event.target.value);
                            }} />
                    </div>
                    <div className="text-center">
                        <button className="btn btn-warning" id={"btn0" + val.id_c} hidden={false} onClick={() => { toEditPass() }}>Editar</button>
                        <button className="btn btn-warning" id={"btn1" + val.id_c} hidden={true} onClick={() => { editPass(val.id_c) }}>Guardar</button>
                        <button className="btn btn-danger" id={"btn2" + val.id_c} onClick={() => { deletePass(val.id_c) }}>Borrar</button>
                        <br/>
                        <a className="btn btn-primary" href={val.website_c}>Visitar sitio</a>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Password;