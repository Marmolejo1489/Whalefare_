import { useState } from 'react';
import Axios from 'axios';

function Add() {

  const [Password, setPassword] = useState("");
  const [User, setUser] = useState("");
  const [Website, setWebsite] = useState("");
  const [Title, setTitle] = useState("");

  const safetyPass = (e) => {
    let strongPassword = new RegExp('(?=.*[A-Z])(?=.*[0-9])(?=.*[:-_!@#$&*.]).{8}');
    let mediumPassword = new RegExp('(?=.*[0-9])(?=.*[!@#$&*.]).{8}');
    if (strongPassword.test(e)) {
      document.getElementById("inputPass").className = "form-control is-valid";
      document.getElementById("p1").innerHTML = "Tu contraseña es fuerte.";
    } else if (mediumPassword.test(e)) {
      document.getElementById("inputPass").className = "form-control is-valid";
      document.getElementById("p1").innerHTML = "Tu contraseña puede mejorar.";
    } else {
      document.getElementById("inputPass").className = "form-control is-invalid";
      document.getElementById("p1").innerHTML = "Tu contraseña es débil.";
    }
  }

  const addPassword = () => {
    Axios.get('http://localhost:4000/profile').then((response) => {
      if (response.data.user) {
        var id_u = response.data.user[0].id_u;

        Axios.post("http://localhost:4000/add", {
          title_c: Title,
          user_c: User,
          pass_c: Password,
          website_c: Website,
          id_u: id_u
        });
      }
    });
  }

  return (
    <div className="col">
      <div className="card">
        <div className="card-body">
          <label>Título</label>
          <div className="mb-3 input-group">
            <input type="text" id="formFileMultiple" className="form-control" placeholder="Escribe aquí."
              onChange={(event) => {
                setTitle(event.target.value);
              }} />
          </div>
          <label>Usuario</label>
          <div className="input-container">
            <input type="text" id="user" className="form-control" placeholder="Opcional"
              onChange={(event) => {
                setUser(event.target.value);
              }} />
          </div>
          <label>Contraseña</label>
          <div className="mb-3 input-group">
            <input type="text" id="inputPass" className="form-control" placeholder="Escribe aquí."
              onChange={(event) => {
                setPassword(event.target.value)
                safetyPass(event.target.value)
                  ;
              }} />
            <p className="valid-feedback" id="p1">

            </p>
            <p className="invalid-feedback" id="p1">
              Tu contraseña es débil.
            </p>
          </div>

          <label>Sitio web</label>
          <div className="mb-3 input-group">
            <input type="website" id="email" className="form-control" placeholder="Escribe aquí."
              onChange={(event) => {
                setWebsite(event.target.value);
              }} />
          </div>

          <button className="btn btn-primary" onClick={addPassword}>Añadir Contraseña</button>

        </div>
      </div>
    </div>
  );
}

export default Add;
