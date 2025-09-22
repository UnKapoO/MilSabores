// Variables globales
let datosCompra = null

// Inicializar página
document.addEventListener("DOMContentLoaded", () => {
    cargarDatosCompra()
    mostrarDetallesPedido()
    actualizarContadorCarrito()
})

// Cargar datos de la compra desde localStorage
function cargarDatosCompra() {
    console.log("[v0] Cargando datos de la compra")

    // Obtener número de pedido de la URL
    const urlParams = new URLSearchParams(window.location.search)
    const numeroPedido = urlParams.get("pedido")

    if (!numeroPedido) {
        console.log("[v0] No se encontró número de pedido en URL")
        mostrarError("No se encontró información del pedido")
        return
    }

    // Cargar datos del localStorage
    const datosGuardados = localStorage.getItem("ultimaCompra")
    if (!datosGuardados) {
        console.log("[v0] No se encontraron datos de compra en localStorage")
        mostrarError("No se encontró información del pedido")
        return
    }

    try {
        datosCompra = JSON.parse(datosGuardados)
        console.log("[v0] Datos de compra cargados:", datosCompra)

        // Verificar que el número de pedido coincida
        if (datosCompra.numeroPedido !== numeroPedido) {
            console.log("[v0] Número de pedido no coincide")
            mostrarError("Información del pedido no válida")
            return
        }
    } catch (error) {
        console.log("[v0] Error al parsear datos de compra:", error)
        mostrarError("Error al cargar información del pedido")
        return
    }
}

// Mostrar detalles del pedido
function mostrarDetallesPedido() {
    if (!datosCompra) {
        console.log("[v0] No hay datos de compra para mostrar")
        return
    }

    console.log("[v0] Mostrando detalles del pedido")

    // Actualizar número de pedido
    document.getElementById("numero-pedido").textContent = datosCompra.numeroPedido

    // Actualizar fecha del pedido
    const fechaPedido = new Date(datosCompra.fecha)
    const fechaFormateada = fechaPedido.toLocaleDateString("es-CL", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
    document.getElementById("fecha-pedido").textContent = fechaFormateada

    // Mostrar productos
    mostrarProductosPedido()

    // Mostrar información de entrega
    mostrarInformacionEntrega()

    // Mostrar email del cliente
    document.getElementById("email-cliente").textContent = datosCompra.cliente.email

    // Mostrar resumen de pago
    mostrarResumenPago()
}

// Mostrar productos del pedido
function mostrarProductosPedido() {
    const contenedorProductos = document.getElementById("productos-pedido")

    contenedorProductos.innerHTML = datosCompra.productos
        .map((producto) => {
            const personalizacion = obtenerTextoPersonalizacion(producto)

            return `
            <div class="product-item">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image">
                <div class="product-info">
                    <div class="product-name">${producto.nombre}</div>
                    <div class="product-details">
                        Cantidad: ${producto.cantidad} | Precio unitario: ${formatearPrecio(producto.precio)}
                    </div>
                    ${personalizacion ? `<div class="product-personalization">${personalizacion}</div>` : ""}
                </div>
                <div class="product-price">
                    ${formatearPrecio(producto.precio * producto.cantidad)}
                </div>
            </div>
        `
        })
        .join("")
}

// Mostrar información de entrega
function mostrarInformacionEntrega() {
    const contenedorEntrega = document.getElementById("info-entrega")
    const cliente = datosCompra.cliente

    // Formatear fecha de entrega
    const fechaEntrega = new Date(cliente.fechaEntrega)
    const fechaEntregaFormateada = fechaEntrega.toLocaleDateString("es-CL", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    contenedorEntrega.innerHTML = `
        <div class="delivery-row">
            <span class="delivery-label">Nombre:</span>
            <span class="delivery-value">${cliente.nombre}</span>
        </div>
        <div class="delivery-row">
            <span class="delivery-label">Teléfono:</span>
            <span class="delivery-value">${cliente.telefono}</span>
        </div>
        <div class="delivery-row">
            <span class="delivery-label">Dirección:</span>
            <span class="delivery-value">${cliente.direccion}</span>
        </div>
        <div class="delivery-row">
            <span class="delivery-label">Comuna:</span>
            <span class="delivery-value">${cliente.comuna}</span>
        </div>
        <div class="delivery-row">
            <span class="delivery-label">Fecha de entrega:</span>
            <span class="delivery-value">${fechaEntregaFormateada}</span>
        </div>
    `
}

// Mostrar resumen de pago
function mostrarResumenPago() {
    const totales = datosCompra.totales

    document.getElementById("resumen-subtotal").textContent = formatearPrecio(totales.subtotal)
    document.getElementById("resumen-envio").textContent = totales.envio === 0 ? "GRATIS" : formatearPrecio(totales.envio)
    document.getElementById("resumen-total").textContent = formatearPrecio(totales.total)

    // Mostrar descuento si existe
    if (totales.descuento > 0) {
        document.getElementById("resumen-descuento").textContent = `-${formatearPrecio(totales.descuento)}`
        document.getElementById("resumen-discount-line").style.display = "flex"
    }

    // Estilo especial para envío gratis
    if (totales.envio === 0) {
        document.getElementById("resumen-envio").innerHTML = '<span style="color: #27ae60; font-weight: 600;">GRATIS</span>'
    }
}

// Obtener texto de personalización
function obtenerTextoPersonalizacion(item) {
    const personalizaciones = []

    if (item.cantidadPersonas) {
        const tamaños = {
            pequeno: "Pequeño (4-6 personas)",
            estandar: "Estándar",
            grande: "Grande (12-15 personas)",
            "extra-grande": "Extra Grande (18-20 personas)",
        }
        personalizaciones.push(`Tamaño: ${tamaños[item.cantidadPersonas] || item.cantidadPersonas}`)
    }

    if (item.mensajeEspecial) {
        personalizaciones.push(`Mensaje: "${item.mensajeEspecial}"`)
    }

    if (item.colorGlaseado) {
        personalizaciones.push(`Glaseado: ${item.colorGlaseado}`)
    }

    return personalizaciones.join(" • ")
}

// Descargar boleta PDF (simulado)
function descargarBoleta() {
    console.log("[v0] Iniciando descarga de boleta")

    if (!datosCompra) {
        alert("No se encontró información del pedido")
        return
    }

    // Simular descarga de PDF
    const link = document.createElement("a")
    link.href = "#"
    link.download = `Boleta_${datosCompra.numeroPedido}.pdf`

    // Mostrar mensaje de simulación
    alert(
        `Descargando boleta: Boleta_${datosCompra.numeroPedido}.pdf\n\n(Esta es una simulación - en un sistema real se generaría un PDF con los detalles de la compra)`,
    )

    console.log("[v0] Simulación de descarga completada")
}

// Mostrar error
function mostrarError(mensaje) {
    console.log("[v0] Mostrando error:", mensaje)

    // Ocultar contenido normal
    document.querySelector(".success-header").style.display = "none"
    document.querySelector(".row").style.display = "none"
    document.querySelector(".confirmation-actions").style.display = "none"
    document.querySelector(".additional-info").style.display = "none"

    // Mostrar mensaje de error
    const errorDiv = document.createElement("div")
    errorDiv.className = "error-container"
    errorDiv.innerHTML = `
        <div class="error-header">
            <div class="error-icon">
                <i class="fa-solid fa-exclamation-triangle"></i>
            </div>
            <h1 class="pacifico-regular">Error</h1>
            <p class="error-subtitle">${mensaje}</p>
        </div>
        <div class="error-actions">
            <button class="btn-action btn-primary" onclick="window.location.href='carrito.html'">
                <i class="fa-solid fa-shopping-cart"></i>
                Ir al Carrito
            </button>
            <button class="btn-action btn-secondary" onclick="window.location.href='catalogo.html'">
                <i class="fa-solid fa-store"></i>
                Ver Catálogo
            </button>
        </div>
    `

    // Agregar estilos de error
    errorDiv.style.cssText = `
        text-align: center;
        padding: 60px 20px;
    `

    const errorHeader = errorDiv.querySelector(".error-header")
    errorHeader.style.cssText = `
        margin-bottom: 40px;
    `

    const errorIcon = errorDiv.querySelector(".error-icon i")
    errorIcon.style.cssText = `
        font-size: 4rem;
        color: #e74c3c;
        margin-bottom: 20px;
    `

    const errorTitle = errorDiv.querySelector("h1")
    errorTitle.style.cssText = `
        color: var(--color-acento-cafe);
        font-size: 2.5rem;
        margin-bottom: 10px;
    `

    const errorSubtitle = errorDiv.querySelector(".error-subtitle")
    errorSubtitle.style.cssText = `
        color: var(--color-letra-gris);
        font-size: 1.2rem;
        margin: 0;
    `

    const errorActions = errorDiv.querySelector(".error-actions")
    errorActions.style.cssText = `
        display: flex;
        justify-content: center;
        gap: 20px;
        flex-wrap: wrap;
    `

    document.querySelector(".container").appendChild(errorDiv)
}

// Actualizar contador del carrito (debería estar en 0 después de la compra)
function actualizarContadorCarrito() {
    const cartCount = document.querySelector(".cart-count")
    if (cartCount) {
        cartCount.textContent = "0"
        cartCount.style.display = "none"
    }
}

// Formatear precio
function formatearPrecio(precio) {
    return `$${precio.toLocaleString("es-CL")}`
}

// Limpiar datos de compra al salir de la página (opcional)
window.addEventListener("beforeunload", () => {
    // Opcional: limpiar datos después de cierto tiempo
    // localStorage.removeItem("ultimaCompra")
})

// Manejar navegación del historial
window.addEventListener("popstate", () => {
    // Si el usuario navega hacia atrás, verificar si aún tiene datos válidos
    if (!localStorage.getItem("ultimaCompra")) {
        window.location.href = "index.html"
    }
})
