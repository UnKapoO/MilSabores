document.addEventListener("DOMContentLoaded", () => {
  // Elementos del nuevo header
    const btnMenuMovil = document.querySelector(".btn-menu-movil")
    const menuMovil = document.querySelector(".menu-movil")
    const btnCerrarMenu = document.querySelector(".btn-cerrar-menu")
    const btnBuscar = document.querySelector(".btn-buscar")
    const inputBusquedaHeader = document.querySelector(".input-busqueda-header")

    // Funcionalidad del menú móvil
    if (btnMenuMovil && menuMovil) {
        btnMenuMovil.addEventListener("click", () => {
        menuMovil.classList.add("abierto")
        document.body.style.overflow = "hidden" // Prevenir scroll del body
        })
    }

    if (btnCerrarMenu && menuMovil) {
        btnCerrarMenu.addEventListener("click", () => {
        menuMovil.classList.remove("abierto")
        document.body.style.overflow = "auto" // Restaurar scroll del body
        })
    }

    // Cerrar menú al hacer click en un enlace (en móvil)
    const enlacesMenuMovil = menuMovil?.querySelectorAll("a")
    enlacesMenuMovil?.forEach((enlace) => {
        enlace.addEventListener("click", () => {
        menuMovil.classList.remove("abierto")
        document.body.style.overflow = "auto"
        })
    })

    // Cerrar menú móvil al hacer click fuera de él
    document.addEventListener("click", (e) => {
        if (
        menuMovil?.classList.contains("abierto") &&
        !menuMovil.contains(e.target) &&
        !btnMenuMovil?.contains(e.target)
        ) {
        menuMovil.classList.remove("abierto")
        document.body.style.overflow = "auto"
        }
    })

    // Funcionalidad de búsqueda en el header
    if (btnBuscar && inputBusquedaHeader) {
        btnBuscar.addEventListener("click", (e) => {
        e.preventDefault()
        realizarBusqueda(inputBusquedaHeader.value)
        })

        inputBusquedaHeader.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            realizarBusqueda(inputBusquedaHeader.value)
        }
        })
    }

    // Función para realizar búsqueda
    function realizarBusqueda(termino) {
        if (termino.trim()) {
        // Si estamos en la página del catálogo, usar la búsqueda local
        if (window.location.pathname.includes("catalogo.html")) {
            const inputBusquedaLocal = document.getElementById("buscar-producto")
            if (inputBusquedaLocal) {
            inputBusquedaLocal.value = termino
            // Disparar evento de búsqueda local
            const evento = new Event("input", { bubbles: true })
            inputBusquedaLocal.dispatchEvent(evento)

            // Scroll hacia los productos
            const productosSection = document.querySelector(".productos-section")
            if (productosSection) {
                productosSection.scrollIntoView({ behavior: "smooth" })
            }
            }
        } else {
            // Si estamos en otra página, redirigir al catálogo con el término de búsqueda
            window.location.href = `catalogo.html?buscar=${encodeURIComponent(termino)}`
        }
        }
    }

    // Cerrar menú móvil al redimensionar la ventana
    window.addEventListener("resize", () => {
        if (window.innerWidth > 992 && menuMovil?.classList.contains("abierto")) {
        menuMovil.classList.remove("abierto")
        document.body.style.overflow = "auto"
        }
    })

    // Actualizar contador del carrito
    function actualizarContadorCarrito() {
        const cartCount = document.querySelector(".cart-count")
        if (cartCount) {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || []
        const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0)
        cartCount.textContent = totalItems
        }
    }

    // Inicializar contador del carrito
    actualizarContadorCarrito()

    // Escuchar cambios en el carrito
    window.addEventListener("storage", actualizarContadorCarrito)

    // También escuchar eventos personalizados del carrito
    document.addEventListener("carritoActualizado", actualizarContadorCarrito)

    // Funcionalidad del botón carrito
    const btnCarrito = document.querySelector(".btn-carrito")
    if (btnCarrito) {
        btnCarrito.addEventListener("click", (e) => {
        e.preventDefault()
        // Aquí puedes agregar la funcionalidad para mostrar el carrito
        // Por ejemplo, abrir un modal o redirigir a la página del carrito
        console.log("Abrir carrito")
        // window.location.href = 'carrito.html'
        })
    }

    // Manejar parámetros de búsqueda en la URL (para cuando se redirige desde otra página)
    const urlParams = new URLSearchParams(window.location.search)
    const terminoBusqueda = urlParams.get("buscar")
    if (terminoBusqueda && window.location.pathname.includes("catalogo.html")) {
        const inputBusquedaLocal = document.getElementById("buscar-producto")
        if (inputBusquedaLocal) {
        inputBusquedaLocal.value = terminoBusqueda
        // Disparar evento de búsqueda
        const evento = new Event("input", { bubbles: true })
        inputBusquedaLocal.dispatchEvent(evento)
        }
    }
})
