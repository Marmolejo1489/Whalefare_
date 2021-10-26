import React from 'react';

function Password(val) {

    return (
        <div className="col">
            <div className="card text-center">
                <div className="container">
                    <label>Nombre de usuario</label>
                    <div className="input-container">
                        <input type="disabled" className="text_area" disabled value={val.user_c} />
                    </div>
                    <label>Contraseña</label>
                    <div className="input-container text-center">
                        <input type="disabled" className="text_area" disabled value={val.nombre} />
                    </div>
                    <label>Sitio web</label>
                    <div className="input-container">
                        <input type="disabled" className="text_area" disabled value={val.website_c} />
                    </div>
                    <div className="input-container">
                        <br/>
                        <a className="button" href={val.website_c}>Visitar sitio</a>
                    </div>
                </div>
            </div>
        </div >

    )

}


export default Password;