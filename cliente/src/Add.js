import { useState } from 'react';
import Axios from 'axios';

function Add() {

  const [Password, setPassword] = useState("");
  const [User, setUser] = useState("");
  const [Domain, setDomain] = useState("");

  const addPassword = () => {
    Axios.get('http://localhost:4000/login').then((response) => {
      if (response.data.user) {
        var id_u = response.data.user[0].id_u;
        
        Axios.post("http://localhost:4000/add", {
          user_c: User,
          pass_c: Password,
          website_c: Domain,
          id_u: id_u
        });
      }
    });


  };

  return (


    <div className="col">
      <div className="card text-center">
        <div className="container">
          <label>Nombre de usuario</label>
          <div className="input-container">
            <input type="text" id="user" className="text_area" placeholder="Opcional"
              onChange={(event) => {
                setUser(event.target.value);
              }} />
          </div>
          <label>Contraseña</label>
          <div className="input-container">
            <input type="text" id="pass" className="text_area" placeholder="Escribe aquí."
              onChange={(event) => {
                setPassword(event.target.value);
              }} />
          </div>
          <label>Sitio web</label>
          <div className="input-container">
            <input type="website" id="email" className="text_area" placeholder="Escribe aquí."
              onChange={(event) => {
                setDomain(event.target.value);
              }} />
          </div>
          <div className="input-container">
            <br />
            <div className="button" onClick={addPassword}>Añadir Contraseña</div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Add;
