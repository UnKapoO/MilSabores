//Lógica de autenticación (login, registro, etc.) y registro usuario
// Funcionalidad para las páginas de autenticación

document.addEventListener("DOMContentLoaded", () => {
// Toggle password visibility
    const togglePasswordBtns = document.querySelectorAll(".btn-toggle-password")

    togglePasswordBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
        const passwordInput = this.parentElement.querySelector('input[type="password"], input[type="text"]')
        const icon = this.querySelector("i")

        if (passwordInput.type === "password") {
            passwordInput.type = "text"
            icon.classList.remove("fa-eye")
            icon.classList.add("fa-eye-slash")
        } else {
            passwordInput.type = "password"
            icon.classList.remove("fa-eye-slash")
            icon.classList.add("fa-eye")
        }
        })
    })

    // Login form validation
    const loginForm = document.getElementById("loginForm")
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
        e.preventDefault()

        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        // Validación básica
        if (!email || !password) {
            mostrarMensaje("Por favor, completa todos los campos", "error")
            return
        }

        const usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados") || "[]")
        const usuario = usuariosRegistrados.find((u) => u.email === email)

        if (!usuario) {
            mostrarMensaje("Error: El usuario no está registrado", "error")
            return
        }

        if (usuario.password !== password) {
            mostrarMensaje("Error: La contraseña es incorrecta", "error")
            return
        }

        mostrarMensaje(`¡Bienvenido ${usuario.nombre}!`, "success")

        // Guardar estado de login en localStorage
        localStorage.setItem("userLoggedIn", "true")
        localStorage.setItem("userEmail", email)
        localStorage.setItem("userName", usuario.nombre)

        // Redireccionar al catálogo después de 2 segundos
        setTimeout(() => {
            window.location.href = "catalogo.html"
        }, 2000)
        })
    }

    // Registro form validation
    const registroForm = document.querySelector("form")
    if (registroForm && window.location.pathname.includes("registro")) {
        registroForm.addEventListener("submit", (e) => {
        e.preventDefault()

        // Validación de campos
        const nombre = document.getElementById("nombrecompleto").value
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        const repass = document.getElementById("repass").value
        const cupon = document.getElementById("cupon").value

        // Validaciones
        if (!nombre || !email || !password || !repass) {
            mostrarMensaje("Por favor, completa todos los campos obligatorios", "error")
            return
        }

        if (password !== repass) {
            mostrarMensaje("Las contraseñas no coinciden", "error")
            return
        }

        const usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados") || "[]")
        if (usuariosRegistrados.find((u) => u.email === email)) {
            mostrarMensaje("Error: Este correo ya está registrado", "error")
            return
        }

        // Verificar códigos de descuento especiales
        let descuentoMensaje = ""
        if (cupon === "FELICES50") {
            descuentoMensaje = "¡Felicidades! Tienes 10% de descuento de por vida."
        }

        // Verificar email institucional de Duoc
        if (email.includes("@duocuc.cl")) {
            descuentoMensaje += " ¡Como estudiante de Duoc, tendrás una torta gratis en tu cumpleaños!"
        }

        const nuevoUsuario = {
            nombre: nombre,
            email: email,
            password: password,
            cupon: cupon,
            fechaRegistro: new Date().toISOString(),
        }

        usuariosRegistrados.push(nuevoUsuario)
        localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosRegistrados))

        // Simulación de registro exitoso
        mostrarMensaje(`¡Registro exitoso! ${descuentoMensaje} Redirigiendo al login...`, "success")

        // Redireccionar al login después de 3 segundos
        setTimeout(() => {
            window.location.href = "login.html"
        }, 3000)
        })

        // Event listeners para validación en tiempo real
        const nombreInput = document.getElementById("nombrecompleto")
        const emailInput = document.getElementById("email")
        const passwordInput = document.getElementById("password")
        const repassInput = document.getElementById("repass")

        const validarNombre = () => {
        const nombre = document.getElementById("nombrecompleto").value
        const errorNombre = document.getElementById("errorNombre")
        if (!nombre) {
            errorNombre.classList.remove("d-none")
            errorNombre.textContent = "El nombre completo es requerido."
        } else {
            errorNombre.classList.add("d-none")
        }
        }

        const validarCorreo = () => {
        const email = document.getElementById("email").value
        const errorCorreo = document.getElementById("errorCorreo")
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailPattern.test(email)) {
            errorCorreo.classList.remove("d-none")
            errorCorreo.textContent = "Por favor, ingresa un correo electrónico válido."
        } else {
            errorCorreo.classList.add("d-none")
        }
        }

        const validarPassword = () => {
        const password = document.getElementById("password").value
        const repass = document.getElementById("repass").value
        const errorPassword = document.getElementById("errorPassword")
        const errorRepass = document.getElementById("errorRepass")
        if (!password) {
            errorPassword.classList.remove("d-none")
            errorPassword.textContent = "La contraseña es requerida."
        } else {
            errorPassword.classList.add("d-none")
        }
        if (password !== repass) {
            errorRepass.classList.remove("d-none")
            errorRepass.textContent = "Las contraseñas no coinciden."
        } else {
            errorRepass.classList.add("d-none")
        }
        }

        if (nombreInput) {
        nombreInput.addEventListener("blur", validarNombre)
        nombreInput.addEventListener("input", validarNombre)
        }

        if (emailInput) {
        emailInput.addEventListener("blur", validarCorreo)
        emailInput.addEventListener("input", validarCorreo)
        }

        if (passwordInput) {
        passwordInput.addEventListener("blur", validarPassword)
        passwordInput.addEventListener("input", validarPassword)
        }

        if (repassInput) {
        repassInput.addEventListener("blur", validarPassword)
        repassInput.addEventListener("input", validarPassword)
        }
    }
    })

    function mostrarMensaje(mensaje, tipo) {
    // Remover mensaje anterior si existe
    const mensajeAnterior = document.querySelector(".mensaje-auth")
    if (mensajeAnterior) {
        mensajeAnterior.remove()
    }

    // Crear nuevo mensaje
    const mensajeDiv = document.createElement("div")
    mensajeDiv.className = `mensaje-auth mensaje-${tipo}`
    mensajeDiv.textContent = mensaje

    // Insertar mensaje después del formulario
    const form = document.querySelector("form")
    form.parentNode.insertBefore(mensajeDiv, form.nextSibling)

    // Auto-remover mensaje después de 5 segundos
    setTimeout(() => {
        if (mensajeDiv.parentNode) {
        mensajeDiv.remove()
        }
    }, 5000)
    }

    // Función para verificar si el usuario está logueado
    function checkUserLogin() {
    const isLoggedIn = localStorage.getItem("userLoggedIn")
    const userEmail = localStorage.getItem("userEmail")

    if (isLoggedIn === "true" && userEmail) {
        // Actualizar el botón de usuario en el header
        const btnUsuario = document.querySelector(".btn-usuario")
        if (btnUsuario) {
        btnUsuario.innerHTML = `<i class="fa-solid fa-user-check"></i>`
        btnUsuario.title = `Logueado como: ${userEmail}`
        }
    }
    }

// Función para logout
function logout() {
    localStorage.removeItem("userLoggedIn")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    window.location.href = "login.html"
}

// Ejecutar verificación de login al cargar la página
document.addEventListener("DOMContentLoaded", checkUserLogin)
