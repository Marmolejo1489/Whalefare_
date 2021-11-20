import { useState } from 'react';
import Axios from 'axios';
const { safetyPass } = require('./validation');

function Add() {

  const [Password, setPassword] = useState("");
  const [User, setUser] = useState("");
  const [Website, setWebsite] = useState("");
  const [Title, setTitle] = useState("");

  /*
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Las contraseñas no coinciden', 'danger', 2000);
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };
  */

  const addPassword = () => {
    Axios.post("http://localhost:4000/add", {
      title_c: Title,
      user_c: User,
      pass_c: Password,
      website_c: Website,
      id_u: 18
    });
    emptyInputs();
    }

  const emptyInputs = () => {
    Array.from(document.querySelectorAll("input[name='form']")).forEach(
      input => (input.value = "")
    );
  }

  return (
    <div className="col">
      <div className="card">
        <div className="card-body">
          <label>Título</label>
          <div className="mb-3 input-group">
            <input
              name="form"
              id={"Title"}
              placeholder="Contraseña de Facebook"
              className="form-control"
              onChange={(event) => { setTitle(event.target.value); }}
            />
          </div>
          <label>Usuario</label>
          <div className="input-container">
            <input
              name="form"
              id={"User"}

              placeholder="Opcional"
              className="form-control"
              onChange={(event) => { setUser(event.target.value) }}
            />
          </div>
          <label>Contraseña</label>
          <div className="mb-3 input-group">
            <input
              name="form"
              id={"Password"}

              placeholder="*********"
              className="form-control"
              onChange={(event) => { 
                setPassword(event.target.value)
                safetyPass(event.target.value);
                }}
            />
            <p className="valid-feedback" id="p1">

            </p>
            <p className="invalid-feedback" id="p1">
              Tu contraseña es débil.
            </p>
          </div>

          <label>Sitio web</label>
          <div className="mb-3 input-group">
            <input
              name="form"
              id={"Website"}
              placeholder="facebook.com"
              className="form-control"
              onChange={(event) => { setWebsite(event.target.value) }}
            />
          </div>

          <button className="btn btn-primary"
            onClick={addPassword}
          >Añadir Contraseña</button>
        </div>
      </div>
    </div>
  );
}

export default Add;
