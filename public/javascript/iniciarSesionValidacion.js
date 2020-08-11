window.addEventListener("load", () => {
    let form = document.querySelector(".form-signin");
    let errorSec = document.querySelector("#errors");
    let email = document.querySelector("#inputEmail");
    let contrasena = document.querySelector("#inputPassword");


    form.addEventListener("submit", (e) => {
        let errors = [];

        //Validacion de email
        if (email.value.trim() == "" || email.value.indexOf("@") == -1 || email.value.indexOf(".") == -1) {
            email.classList.add("is-invalid");
            errors.push("Debe ser un mail valido");
        } //Falta validacion con respecto a la db

        //Validacion de contraseña
        if (contrasena.value.trim() == "" || contrasena.value.length < 8) {
            contrasena.classList.add("is-invalid");
            errors.push("La contraseña es obligatoria con mas de 8 caracteres");
        } //Falta validacion con respecto a la db

        //Validacion de Errors
        if (errors.length != 0) {
            e.preventDefault();

            errors.forEach(error => {
                errorSec.innerHTML += "<li>" + error + "</li>";
            })
        }
    })
});

//Ver pq cuando hay errores, me redirige a Create Account