// Funcionalidad específica para la página de inicio

// Declare productosData variable before using it
const productosData = [
    { nombre: "Producto 1", codigo: "001" },
    { nombre: "Producto 2", codigo: "002" },
    // Add more products as needed
]

document.addEventListener("DOMContentLoaded", () => {
    // Inicializar funcionalidades del home
    inicializarHome()
})

function inicializarHome() {
    // Configurar carrusel de productos destacados
    configurarProductosDestacados()

    // Configurar galería de imágenes
    configurarGaleria()

    // Configurar animaciones de scroll
    configurarAnimacionesScroll()

    // Configurar enlaces de categorías
    configurarEnlacesCategorias()

    // Actualizar contador del carrito
    actualizarContadorCarrito()
}

// Configurar productos destacados
function configurarProductosDestacados() {
    const opciones = document.querySelectorAll(".container-options span")
    const productos = document.querySelectorAll(".card-product")

    opciones.forEach((opcion) => {
        opcion.addEventListener("click", function () {
            // Remover clase active de todas las opciones
            opciones.forEach((o) => o.classList.remove("active"))
            // Agregar clase active a la opción clickeada
            this.classList.add("active")

            // Aquí podrías filtrar productos según la opción seleccionada
            filtrarProductosDestacados(this.textContent.trim())
        })
    })

    // Configurar botones de agregar al carrito
    productos.forEach((producto) => {
        const btnAgregar = producto.querySelector(".add-cart")
        if (btnAgregar) {
            btnAgregar.addEventListener("click", (e) => {
                e.stopPropagation()
                const nombreProducto = producto.querySelector("h3").textContent
                agregarAlCarritoDesdeHome(nombreProducto)
            })
        }
    })
}

// Filtrar productos destacados
function filtrarProductosDestacados(filtro) {
    const productos = document.querySelectorAll(".card-product")

    productos.forEach((producto) => {
        // Mostrar todos los productos por defecto
        producto.style.display = "block"

        // Aquí podrías implementar lógica específica de filtrado
        // basada en el filtro seleccionado (Más Vendidos, Nuevos, Especiales)
    })
}

// Configurar galería de imágenes
function configurarGaleria() {
    const imagenesGaleria = document.querySelectorAll(".gallery img")

    imagenesGaleria.forEach((imagen) => {
        imagen.addEventListener("click", function () {
            abrirModalGaleria(this.src, this.alt)
        })

        // Efecto hover
        imagen.addEventListener("mouseenter", function () {
            this.style.transform = "scale(1.05)"
        })

        imagen.addEventListener("mouseleave", function () {
            this.style.transform = "scale(1)"
        })
    })
}

// Abrir modal de galería
function abrirModalGaleria(src, alt) {
    const modal = document.createElement("div")
    modal.className = "modal-galeria"
    modal.innerHTML = `
        <div class="modal-galeria-content">
            <span class="modal-galeria-close">&times;</span>
            <img src="${src}" alt="${alt}">
            <p>${alt}</p>
        </div>
    `

    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
    `

    document.body.appendChild(modal)
    document.body.style.overflow = "hidden"

    // Cerrar modal
    const btnCerrar = modal.querySelector(".modal-galeria-close")
    btnCerrar.addEventListener("click", () => cerrarModalGaleria(modal))
    modal.addEventListener("click", (e) => {
        if (e.target === modal) cerrarModalGaleria(modal)
    })
}

// Cerrar modal de galería
function cerrarModalGaleria(modal) {
    document.body.removeChild(modal)
    document.body.style.overflow = "auto"
}

// Configurar animaciones de scroll
function configurarAnimacionesScroll() {
    const elementos = document.querySelectorAll(".container-features, .top-categories, .top-products, .about-us, .blogs")

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1"
                    entry.target.style.transform = "translateY(0)"
                }
            })
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
        },
    )

    elementos.forEach((elemento) => {
        elemento.style.opacity = "0"
        elemento.style.transform = "translateY(30px)"
        elemento.style.transition = "opacity 0.6s ease, transform 0.6s ease"
        observer.observe(elemento)
    })
}

// Configurar enlaces de categorías
function configurarEnlacesCategorias() {
    const tarjetasCategorias = document.querySelectorAll(".card-category")

    tarjetasCategorias.forEach((tarjeta) => {
        tarjeta.addEventListener("click", function () {
            const categoria = this.classList.contains("category-tortas")
                ? "tortas-cuadradas"
                : this.classList.contains("category-postres")
                    ? "postres-individuales"
                    : this.classList.contains("category-especiales")
                        ? "especiales"
                        : "todas"

            window.location.href = `catalogo.html?categoria=${categoria}`
        })

        // Efecto hover
        tarjeta.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-10px)"
        })

        tarjeta.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0)"
        })
    })
}

// Agregar al carrito desde home
function agregarAlCarritoDesdeHome(nombreProducto) {
    // Buscar el producto en los datos
    if (typeof productosData !== "undefined") {
        const producto = productosData.find((p) => p.nombre === nombreProducto)
        if (producto) {
            const carrito = JSON.parse(localStorage.getItem("carrito")) || []

            const itemExistente = carrito.find((item) => item.codigo === producto.codigo)
            if (itemExistente) {
                itemExistente.cantidad += 1
            } else {
                carrito.push({
                    ...producto,
                    cantidad: 1,
                })
            }

            localStorage.setItem("carrito", JSON.stringify(carrito))
            actualizarContadorCarrito()
            mostrarNotificacionHome(`${producto.nombre} agregado al carrito`)
        }
    }
}

// Actualizar contador del carrito
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || []
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0)
    const cartCount = document.querySelector(".cart-count")

    if (cartCount) {
        cartCount.textContent = totalItems
        cartCount.style.display = totalItems > 0 ? "flex" : "none"
    }
}

// Mostrar notificación en home
function mostrarNotificacionHome(mensaje) {
    const notificacion = document.createElement("div")
    notificacion.className = "notificacion-home"
    notificacion.innerHTML = `
        <i class="fa-solid fa-check-circle"></i>
        <span>${mensaje}</span>
    `

    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-acento-cafe);
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
    `

    document.body.appendChild(notificacion)

    setTimeout(() => {
        notificacion.style.transform = "translateX(0)"
    }, 100)

    setTimeout(() => {
        notificacion.style.transform = "translateX(100%)"
        setTimeout(() => {
            if (document.body.contains(notificacion)) {
                document.body.removeChild(notificacion)
            }
        }, 300)
    }, 3000)
}

// Configurar enlaces del blog
document.addEventListener("DOMContentLoaded", () => {
    const enlacesBlog = document.querySelectorAll(".btn-read-more")
    enlacesBlog.forEach((enlace) => {
        enlace.addEventListener("click", () => {
            window.location.href = "blog.html"
        })
    })
})
