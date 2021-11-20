import React from 'react'

function ValidationModal(props) {
    const type = props.modalValType;
    if (type === 'emptyform') {
        return (
            <div>
                Llena todos los campos
            </div>
        )
    } else if (type === 'title') {
        return (
            <div>
                Ingresa un título válido
            </div>
        )
    } else if (type === 'safepassword') {
        return (
            <div>
                Ingresa una contraseña más segura
            </div>
        )
    } else if (type === 'password') {
        return (
            <div>
                Ingresa una contraseña válida
            </div>
        )
    } else if (type === 'website') {
        return (
            <div>
                Ingresa un sitio web válido
            </div>
        )
    } else if (type === 'user') {
        return (
            <div>
                Ingresa un usuario válido
            </div>
        )
    } else if (type === 'email') {
        return (
            <div>
                Ingresa un correo válido
            </div>
        )
    } else {
        return (
            <div>
                
            </div>
        )
    }
}

export default ValidationModal