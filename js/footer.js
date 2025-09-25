
document.addEventListener("DOMContentLoaded", () => {
    // Inicializar funcionalidad del footer
    inicializarFooter()
})

function inicializarFooter() {
    // Configurar newsletter del footer
    const newsletterFormFooter = document.getElementById("newsletter-form-footer")
    if (newsletterFormFooter) {
        newsletterFormFooter.addEventListener("submit", manejarSuscripcionFooter)
    }

    // Configurar enlaces de redes sociales
    configurarRedesSociales()

    // Actualizar año en copyright
    actualizarCopyright()
}

// Manejar suscripción al newsletter desde el footer
function manejarSuscripcionFooter(e) {
    e.preventDefault()
    const email = e.target.querySelector('input[type="email"]').value

    // Validar email
    if (!validarEmail(email)) {
        mostrarNotificacionFooter("Por favor, ingresa un email válido", "error")
        return
    }

    // Simular suscripción exitosa
    mostrarNotificacionFooter(`¡Gracias por suscribirte! Confirma tu suscripción en ${email}`, "success")
    e.target.reset()
}

// Configurar enlaces de redes sociales
function configurarRedesSociales() {
    const redesSociales = {
        "fa-facebook": "https://facebook.com/milsabores",
        "fa-instagram": "https://instagram.com/milsabores",
        "fa-whatsapp": "https://wa.me/56999999999",
        "fa-tiktok": "https://tiktok.com/@milsabores",
    }

    document.querySelectorAll(".red-social").forEach((enlace) => {
        const icono = enlace.querySelector("i")
        if (icono) {
            const claseIcono = Array.from(icono.classList).find((clase) => clase.startsWith("fa-"))
            if (redesSociales[claseIcono]) {
                enlace.href = redesSociales[claseIcono]
                enlace.target = "_blank"
                enlace.rel = "noopener noreferrer"
            }
        }
    })
}

// Actualizar año en copyright
function actualizarCopyright() {
    const añoActual = new Date().getFullYear()
    const copyrightElement = document.querySelector(".footer-copyright p")
    if (copyrightElement) {
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace("2024", añoActual)
    }
}

// Validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

// Mostrar notificación específica del footer
function mostrarNotificacionFooter(mensaje, tipo = "success") {
    // Crear elemento de notificación
    const notificacion = document.createElement("div")
    notificacion.className = `notificacion notificacion-${tipo}`

    const icono = tipo === "success" ? "fa-check-circle" : "fa-exclamation-circle"
    const color = tipo === "success" ? "var(--color-acento-cafe)" : "#e74c3c"

    notificacion.innerHTML = `
        <i class="fa-solid ${icono}"></i>
        <span>${mensaje}</span>
    `

    // Estilos de la notificación
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${color};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        max-width: 350px;
    `

    document.body.appendChild(notificacion)

    // Animar entrada
    setTimeout(() => {
        notificacion.style.transform = "translateX(0)"
    }, 100)

    // Remover después de 4 segundos
    setTimeout(() => {
        notificacion.style.transform = "translateX(100%)"
        setTimeout(() => {
            if (document.body.contains(notificacion)) {
                document.body.removeChild(notificacion)
            }
        }, 300)
    }, 4000)
}

// Función para cargar el footer en páginas que lo necesiten
function cargarFooter() {
    fetch("components/footer.html")
        .then((response) => response.text())
        .then((html) => {
            // Buscar donde insertar el footer (antes del cierre del body)
            const body = document.body
            const footerContainer = document.createElement("div")
            footerContainer.innerHTML = html
            body.appendChild(footerContainer.firstElementChild)

            // Reinicializar funcionalidad después de cargar
            inicializarFooter()
        })
        .catch((error) => {
            console.error("Error cargando el footer:", error)
        })
}

// Exportar funciones para uso global
window.cargarFooter = cargarFooter
window.inicializarFooter = inicializarFooter
