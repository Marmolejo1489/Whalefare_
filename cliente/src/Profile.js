import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function Profile() {

    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");
    var [clicked, setClicked] = useState(true);
    
    const toEditUser = () => {
        if (clicked) {
            document.getElementById("btn0" + id).hidden = true;
            document.getElementById("btn1" + id).hidden = false;
            document.getElementById("user" + id).disabled = false;
            document.getElementById("email" + id).disabled = false;
            
            setClicked(false);
            console.log(clicked);
        }
    }

    const editUser = (id_u) => {
        if (!clicked) {
            document.getElementById("btn0" + id).hidden = false;
            document.getElementById("btn1" + id).hidden = true;
            document.getElementById("user" + id).disabled = true;
            document.getElementById("email" + id).disabled = true;
            
            setClicked(true);
            /*
            Axios.post("http://localhost:4000/edit/" + id_c, {
                title_c: Title,
                user_c: User,
                pass_c: Password,
                website_c: Website
            });
            */
        }
    }


    useEffect(() => {
        Axios.get('http://localhost:4000/profile').then((response) => {
            if (response.data.user) {
                setUser(response.data.user[0].user_u);
                setId(response.data.user[0].id_u);
                setEmail(response.data.user[0].email_u);
            }
        });
    }, []);

    return (
        <div className="row justify-content-center">

            <div className="col-4 p-4">
                <div className="card">
                    <h3 className="card-header">{user}</h3>
                    <div>
                        <img height="200px" width="200px" src={"https://avatars.dicebear.com/api/jdenticon/"+id+".svg?b=%23000000&r=50"} className="card-img-top p-2" alt="profilePic" />
                    </div>
                    <div className="container">
                        <label>Nombre de usuario</label>
                        <div className="mb-3 input-group">
                            <input type="text" className="form-control" disabled={true} defaultValue={user} id={"user" + id}
                                onChange={(event) => {
                                    setUser(event.target.value);
                                }} />
                        </div>
                        <label>Correo electrónico</label>
                        <div className="mb-3 input-group">
                            <input type="email" className="form-control" disabled={true} defaultValue={email} id={"email" + id}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                            />
                        </div>
                        <button className="btn btn-warning" id={"btn0" + id} hidden={false} onClick={() => { toEditUser(id) }}>Editar</button>
                        <button className="btn btn-warning" id={"btn1" + id} hidden={true} onClick={() => { editUser(id) }}>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;