//Validar Correo Electronico
document.getElementById('email').addEventListener('input', function() {
    campo = event.target;
    valido = document.getElementById('emailOK');
        
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    //Se muestra un texto a modo de ejemplo, luego va a ser un icono
    if (emailRegex.test(campo.value)) {
      valido.innerText = "válido";
    } else {
      valido.innerText = "incorrecto";
    }
});

function validarcontrasena(id){
    return document.getElementById(id);
  }
  
  //Validar Contraseñas
var pass1 = document.getElementById("pass1").value;
var pass2 = document.getElementById("pass2").value;
//Que no haya dejado espacios campos vacios
if (pass1.length == 0 || pass2.length == 0) {
    alert("Los campos de la password no pueden quedar vacios");
    return false;
  }
  //Que ambas contraseñas coinciden
  if (pass1 != pass2) {
    alert("Las passwords deben de coincidir");
    return false;
  } else {
    alert("Todo esta correcto");
    return true; 
  }


 