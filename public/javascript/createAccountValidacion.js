window.addEventListener("load", () => {
    let form = document.querySelector(".form-signin");
    let errorSec = document.querySelector("#errors");
    let nombre = document.querySelector("#inputUserame");
    let apellido = document.querySelector("#inputLastname");
    let email = document.querySelector("#inputEmail");
    let confirmarMail = document.querySelector("#inputConfirmEmail");
    let contrasena = document.querySelector("#inputPassword");
    let confirmarContrasena = document.querySelector("#inputConfirmPassword");
    let avatar = document.querySelector('#inputFile2');

    // Array de errores
    var errors = [];

    //Validacion si el mail existe
   email.addEventListener("change", ()=> {
   var resultado;
       fetch("http://localhost:3030/users/getemails/" + email.value)
           .then((resp) => {
               return resp.text();
           })
           .then((resp) => {
               resultado = resp;
               if (resultado == "true"){
               email.classList.add("is-invalid");
               errors.push("Esa casilla de e-mail ya existe, por favor logueate");
               }
           });
       });

    form.addEventListener("submit", (e) => {

        //Validacion de nombre
        if (nombre.value.trim() == "" || nombre.value.length < 2) {
            nombre.classList.add("is-invalid");
            errors.push("El nombre es obligatorio con mas de 2 caracteres");
        }

        //Validacion de apellido
        if (apellido.value.trim() == "" || apellido.value.length < 2) {
            apellido.classList.add("is-invalid");
            errors.push("El nombre es obligatorio con mas de 2 caracteres");
        }

        //Validacion de email
        if (email.value.trim() == "" || email.value.indexOf("@") == -1 || email.value.indexOf(".") == -1) {
            email.classList.add("is-invalid");
            errors.push("El correo es obligatorio");
        }

        if (confirmarMail.value.trim() == "" || confirmarMail.value.indexOf("@") == -1 || confirmarMail.value.indexOf(".") == -1) {
            confirmarMail.classList.add("is-invalid");
            errors.push("El correo es obligatorio");
        }

        if (email.value.trim() != confirmarMail.value.trim()) {
            email.classList.add("is-invalid");
            confirmarMail.classList.add("is-invalid")
            errors.push("Las casillas de email deben ser iguales");
        }

        //Validacion de contraseña
        if (contrasena.value.trim() == "" || contrasena.value.length < 8) {
            contrasena.classList.add("is-invalid");
            errors.push("La contraseña es obligatoria con mas de 8 caracteres");
        }

        if (confirmarContrasena.value.trim() == "" || confirmarContrasena.value.length < 8) {
            confirmarContrasena.classList.add("is-invalid");
            errors.push("Debe repetir la contraseña con mas de 8 caracteres");
        }

        if (contrasena.value.trim() != confirmarContrasena.value.trim()) {
            contrasena.classList.add("is-invalid");
            confirmarContrasena.classList.add("is-invalid");
            errors.push("Las contrase­ñas deben ser iguales");
        }

        //Validacion de avatar
        if (avatar.value.trim() == "") {
            errors.push("Debe subir una imagen a su avatar")
        } else {
            if (avatar.value.includes(".jpg") || avatar.value.includes(".jpeg") || avatar.value.includes(".png") || avatar.value.includes(".gif")) {
                //No hagas nada baby
            } else {
                errors.push("El formato de la imagen tiene q ser jpg, jpeg, png o gif")
            }
        }

        //Validacion de Errors
        if (errors.length != 0) {
            e.preventDefault();

            errors.forEach(error => {
                errorSec.innerHTML += "<li>" + error + "</li>";
            })
        }
        errors = []
    })
});