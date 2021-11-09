function validar_datosr(){
    var a = document.getElementById("pass").value;
    var b = document.getElementById("correo").value;
    var c = document.getElementById("usuario").value;
     emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
     passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
     
    if(b.length == 0 || a.length == 0 || c.length == 0){
        alert("¡Llena todos los campos!")
    }else if(c.length == 0){
         alert("¡Ingresa tu nombre de usuario!");
    }else if(b.length == 0){
         alert("¡Ingresa tu correo electrónico!");
    }else if(a.length == 0){
         alert("¡Crea una contraseña!");
    }else if (!emailRegex.test(b)){
        alert("¡Ingresa un correo válido!");
    }else if(c.length <5 || c.length>20){
         alert("¡Ingresa un nombre de usuario de  5 - 10 caracteres!");
     }else if(!passRegex.test(a)){
         alert("¡Ingresa una contraseña de al menos 8 caracteres, una mayúscula, una minúscula y un número !");
    }
    else{
    window.location.href = 'registro_exitoso.html';
}
}

function validar_datosr2(){
    var a = document.getElementById("pass").value;
    var b = document.getElementById("correo").value;
    var c = document.getElementById("usuario").value;
     emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
     passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
     
    if(b.length == 0 || a.length == 0 || c.length == 0){
        alert("¡Llena todos los campos!")
    }else if(c.length == 0){
         alert("¡Ingresa tu nombre de usuario!");
    }else if(b.length == 0){
         alert("¡Ingresa tu correo electrónico!");
    }else if(a.length == 0){
         alert("¡Crea una contraseña!");
    }else if (!emailRegex.test(b)){
        alert("¡Ingresa un correo válido!");
    }else if(c.length <5 || c.length>20){
         alert("¡Ingresa un nombre de usuario de  5 - 10 caracteres!");
     }else if(!passRegex.test(a)){
         alert("¡Ingresa una contraseña de al menos 8 caracteres, una mayúscula, una minúscula y un número !");
    }
    else{
    
}

}


function validar_datosi(){
    var a = document.getElementById("pass").value;
    var b = document.getElementById("correo").value;
     emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
     
     
    if(b.length == 0 && a.length == 0){
        alert("¡Ingresa tus datos!")
    }else if(b.length == 0){
         alert("¡Ingresa tu correo electrónico!");
    }else if(a.length == 0){
         alert("¡Ingresa tu contraseña!");
    }else if (!emailRegex.test(b)){
        alert("¡Ingresa un correo válido!");
    }
    else{
    
}

}


function validar_pass(){
    var a = document.getElementById("url").value;
    var b = document.getElementById("user").value;
    var c = document.getElementById("name").value;
     urlRegex = /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/;
     
    if(b.length == 0 || a.length == 0 || c.length == 0){
        alert("¡Llena todos los campos!");
    }else if(b.length == 0){
         alert("¡Ingresa el usuario que corresponde a tu contraseña!");
    }else if(a.length == 0){
         alert("¡Ingresa el dominio!");
    }else if(c.length == 0){
         alert("¡Ingresa el nombre!");
    }else if (!urlRegex.test(a)){
        alert("¡Ingresa un dominio válido!");
    }
    else{
    
}

}


const passval = (password) =>{
    var a = password;
    passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{20,}$/;
    if(a.length == 0){
        alert("¡Ingresa una contraseña!");
    }else if (!passRegex.test(a)){
        alert("Mínimo ocho caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.");
    }
    else{
    
}

}
