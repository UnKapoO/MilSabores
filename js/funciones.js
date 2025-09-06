function validarNombre() {
    let nombrecompleto = document.getElementById("nombrecompleto").value;
    let nomHelp = document.getElementById("nomHelp");

    const soloLetrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;

    //Validar si esta vacio
    if (nombrecompleto.trim() === "") {
        nomHelp.innerHTML = "El nombre no puede estar vacio.";
        nomHelp.classList.remove("text-success", "d-none");
        nomHelp.classList.add("text-danger");
    }

    //Valida que sea tipo string
    else if (!soloLetrasRegex.test(nombrecompleto)) {
        nomHelp.innerHTML = "El nombre solo puede contener letras y espacios.";
        nomHelp.classList.remove("text-success", "d-none");
        nomHelp.classList.add("text-danger");
    }
    //Validar el largo
    else if (nombrecompleto.length > 30) {
        nomHelp.innerHTML = "El nombre es demasiado largo.";
        nomHelp.classList.remove("text-success", "d-none");
        nomHelp.classList.add("text-danger");

    } else {
        nomHelp.innerHTML = "Nombre válido";
        nomHelp.classList.remove("text-danger", "d-none");
        nomHelp.classList.add("text-success");

    }
}

function validarCorreo() {
    let email = document.getElementById("email").value;
    let emailHelp = document.getElementById("emailHelp");

    //Expresion para validar el formato
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!regexEmail.test(email)) {
        emailHelp.innerHTML = "Ingrese un correo válido.";
        emailHelp.classList.remove("text-succes", "d-none");
        emailHelp.classList.add("text-danger");

    } else {
        emailHelp.innerHTML = "Correo válido";
        emailHelp.classList.remove("text-danger", "d-none");
        emailHelp.classList.add("text-success");

    }
}



function validarPassword() {
    let password = document.getElementById("password").value;
    let repass = document.getElementById("repass").value;

    //Para cambiar los valores del Small
    let passHelp = document.getElementById("passHelp");
    let repassHelp = document.getElementById("repassHelp");

    //Valida que la contraseña no este vacia
    if (password.trim() === "") {
        passHelp.innerHTML = "La contraseña es obligatoria"
        passHelp.classList.remove("text-success", "d-none");
        passHelp.classList.add("text-danger");
    }

    //Valida que la contraseña este entre 6 y 10 caracteres
    else if (password.length < 6) {
        passHelp.innerHTML = "La contraseña debe contener al menos 6 caracteres"
        passHelp.classList.remove("text-success", "d-none");
        passHelp.classList.add("text-danger");
    }

    else {
        passHelp.innerHTML = "Contraseña válida";
        passHelp.classList.remove("text-danger", "d-none");
        passHelp.classList.add("text-success");
    }

    //Valida que las contraseñas coincidan
    if (password.trim() === "") {
        repassHelp.innerHTML = "La contraseña es obligatoria"
        repassHelp.classList.remove("text-success", "d-none");
        repassHelp.classList.add("text-danger");
    }
    else if (password === repass) {
        repassHelp.innerHTML = "Las contraseñas coinciden ✅";
        repassHelp.classList.remove("text-danger", "d-none");
        repassHelp.classList.add("text-success");

    } else {
        repassHelp.innerHTML = "Las contraseñas no coinciden ⛔";
        repassHelp.classList.remove("text-succes", "d-none");
        repassHelp.classList.add("text-danger");
    }

}


