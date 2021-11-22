import React from 'react';
import Axios from 'axios';

function Logout(){
    Axios.post("http://localhost:4000/logout");
    return(
        <div className='text-center md-3 p-5'>
            Gracias por visitarnos. Vuelve pronto.
        </div>
    );
    
}

export default Logout;