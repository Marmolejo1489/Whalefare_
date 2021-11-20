import React from "react";
import {Link} from 'react-router-dom'

function NotFound() {
    return(
        <div>
            La página que intentas buscar no existe
            <br/>
            <Link to='/'>Regresar a la página principal</Link>
        </div>
    )
}

export default NotFound;