// Variables globales
let carritoCheckout = JSON.parse(localStorage.getItem("carrito")) || []
const descuentoAplicado = 0

// Constantes
const COSTO_ENVIO = 3000
const ENVIO_GRATIS_MINIMO = 50000

// Inicializar página
document.addEventListener("DOMContentLoaded", () => {
    verificarCarrito()
    cargarResumenPedido()
    configurarValidaciones()
    configurarEventListeners()
    configurarFechaMinima()
    actualizarContadorCarrito()
})

// Verificar que hay productos en el carrito
function verificarCarrito() {
    if (carritoCheckout.length === 0) {
        alert("Tu carrito está vacío. Serás redirigido al catálogo.")
        window.location.href = "catalogo.html"
        return
    }
}

// Cargar resumen del pedido
function cargarResumenPedido() {
    const summaryProducts = document.getElementById("summary-products")
    const summarySubtotal = document.getElementById("summary-subtotal")
    const summaryEnvio = document.getElementById("summary-envio")
    const summaryTotal = document.getElementById("summary-total")

    // Renderizar productos
    summaryProducts.innerHTML = carritoCheckout
        .map((item) => {
            const personalizacion = obtenerTextoPersonalizacion(item)
            return `
            <div class="summary-product">
                <img src="${item.imagen}" alt="${item.nombre}" class="summary-product-image">
                <div class="summary-product-info">
                    <div class="summary-product-name">${item.nombre}</div>
                    <div class="summary-product-details">
                        Cantidad: ${item.cantidad}
                        ${personalizacion ? `<br>${personalizacion}` : ""}
                    </div>
                </div>
                <div class="summary-product-price">
                    ${formatearPrecio(item.precio * item.cantidad)}
                </div>
            </div>
        `
        })
        .join("")

    // Calcular totales
    const subtotal = carritoCheckout.reduce((total, item) => total + item.precio * item.cantidad, 0)
    const envio = subtotal >= ENVIO_GRATIS_MINIMO ? 0 : COSTO_ENVIO
    const total = subtotal + envio - descuentoAplicado

    summarySubtotal.textContent = formatearPrecio(subtotal)
    summaryEnvio.textContent = envio === 0 ? "GRATIS" : formatearPrecio(envio)
    summaryTotal.textContent = formatearPrecio(total)

    if (envio === 0) {
        summaryEnvio.innerHTML = '<span style="color: #27ae60; font-weight: 600;">GRATIS</span>'
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

// Configurar fecha mínima (mañana)
function configurarFechaMinima() {
    const fechaEntrega = document.getElementById("fecha-entrega")
    const mañana = new Date()
    mañana.setDate(mañana.getDate() + 1)

    const fechaMinima = mañana.toISOString().split("T")[0]
    fechaEntrega.min = fechaMinima
    fechaEntrega.value = fechaMinima
}

// Configurar validaciones en tiempo real
function configurarValidaciones() {
    // Validación número de tarjeta
    const numeroTarjeta = document.getElementById("numero-tarjeta")
    numeroTarjeta.addEventListener("input", (e) => {
        // Remover espacios y caracteres no numéricos
        let valor = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

        // Limitar a 16 dígitos
        if (valor.length > 16) {
            valor = valor.substring(0, 16)
        }

        // Formatear con espacios cada 4 dígitos
        const valorFormateado = valor.replace(/(.{4})/g, "$1 ").trim()
        e.target.value = valorFormateado

        // Validar longitud
        validarNumeroTarjeta(valor)
    })

    // Validación fecha de vencimiento
    const fechaVencimiento = document.getElementById("fecha-vencimiento")
    fechaVencimiento.addEventListener("input", (e) => {
        let valor = e.target.value.replace(/\D/g, "")

        if (valor.length >= 2) {
            valor = valor.substring(0, 2) + "/" + valor.substring(2, 4)
        }

        e.target.value = valor

        if (valor.length === 5) {
            validarFechaVencimiento(valor)
        }
    })

    // Validación CVV
    const cvv = document.getElementById("cvv")
    cvv.addEventListener("input", (e) => {
        // Solo números, máximo 3 dígitos
        let valor = e.target.value.replace(/\D/g, "")
        if (valor.length > 3) {
            valor = valor.substring(0, 3)
        }
        e.target.value = valor

        validarCVV(valor)
    })

    // Validación nombre del titular
    const nombreTitular = document.getElementById("nombre-titular")
    nombreTitular.addEventListener("input", (e) => {
        // Solo letras y espacios
        e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "")
        validarNombreTitular(e.target.value)
    })

    // Validación teléfono
    const telefono = document.getElementById("telefono")
    telefono.addEventListener("input", (e) => {
        // Solo números, espacios, guiones y paréntesis
        e.target.value = e.target.value.replace(/[^0-9\s\-$$$$+]/g, "")
    })

    // Validación email
    const email = document.getElementById("email")
    email.addEventListener("blur", (e) => {
        validarEmail(e.target.value)
    })
}

// Funciones de validación específicas
function validarNumeroTarjeta(numero) {
    const input = document.getElementById("numero-tarjeta")

    if (numero.length !== 16) {
        mostrarError(input, "El número de tarjeta debe tener 16 dígitos")
        return false
    }

    // Algoritmo de Luhn para validar número de tarjeta
    if (!validarLuhn(numero)) {
        mostrarError(input, "Número de tarjeta inválido")
        return false
    }

    limpiarError(input)
    return true
}

function validarFechaVencimiento(fecha) {
    const input = document.getElementById("fecha-vencimiento")

    if (fecha.length !== 5) {
        mostrarError(input, "Formato inválido (MM/AA)")
        return false
    }

    const [mes, año] = fecha.split("/")
    const mesNum = Number.parseInt(mes)
    const añoNum = Number.parseInt("20" + año)

    if (mesNum < 1 || mesNum > 12) {
        mostrarError(input, "Mes inválido")
        return false
    }

    const fechaActual = new Date()
    const fechaTarjeta = new Date(añoNum, mesNum - 1)

    if (fechaTarjeta <= fechaActual) {
        mostrarError(input, "La tarjeta está vencida")
        return false
    }

    limpiarError(input)
    return true
}

function validarCVV(cvv) {
    const input = document.getElementById("cvv")

    if (cvv.length !== 3) {
        mostrarError(input, "El CVV debe tener 3 dígitos")
        return false
    }

    limpiarError(input)
    return true
}

function validarNombreTitular(nombre) {
    const input = document.getElementById("nombre-titular")

    if (nombre.trim().length < 2) {
        mostrarError(input, "Ingresa el nombre como aparece en la tarjeta")
        return false
    }

    limpiarError(input)
    return true
}

function validarEmail(email) {
    const input = document.getElementById("email")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
        mostrarError(input, "Ingresa un email válido")
        return false
    }

    limpiarError(input)
    return true
}

// Algoritmo de Luhn para validar números de tarjeta
function validarLuhn(numero) {
    let suma = 0
    let alternar = false

    for (let i = numero.length - 1; i >= 0; i--) {
        let digito = Number.parseInt(numero.charAt(i))

        if (alternar) {
            digito *= 2
            if (digito > 9) {
                digito = (digito % 10) + 1
            }
        }

        suma += digito
        alternar = !alternar
    }

    return suma % 10 === 0
}

// Mostrar error en campo
function mostrarError(input, mensaje) {
    input.classList.add("error")

    // Remover mensaje de error anterior
    const errorAnterior = input.parentNode.querySelector(".error-message")
    if (errorAnterior) {
        errorAnterior.remove()
    }

    // Crear nuevo mensaje de error
    const errorDiv = document.createElement("div")
    errorDiv.className = "error-message"
    errorDiv.textContent = mensaje
    input.parentNode.appendChild(errorDiv)
}

// Limpiar error de campo
function limpiarError(input) {
    input.classList.remove("error")
    const errorMessage = input.parentNode.querySelector(".error-message")
    if (errorMessage) {
        errorMessage.remove()
    }
}

// Configurar event listeners
function configurarEventListeners() {
    const btnFinalizar = document.getElementById("btn-finalizar-compra")
    btnFinalizar.addEventListener("click", procesarPago)
}

// Validar todos los campos antes del pago
function validarFormularioCompleto() {
    let esValido = true
    const errores = []

    // Validar información de entrega
    const nombreCompleto = document.getElementById("nombre-completo").value.trim()
    const telefono = document.getElementById("telefono").value.trim()
    const email = document.getElementById("email").value.trim()
    const direccion = document.getElementById("direccion").value.trim()
    const comuna = document.getElementById("comuna").value
    const fechaEntrega = document.getElementById("fecha-entrega").value

    if (!nombreCompleto) {
        errores.push("Nombre completo es requerido")
        esValido = false
    }

    if (!telefono) {
        errores.push("Teléfono es requerido")
        esValido = false
    }

    if (!email || !validarEmail(email)) {
        errores.push("Email válido es requerido")
        esValido = false
    }

    if (!direccion) {
        errores.push("Dirección es requerida")
        esValido = false
    }

    if (!comuna) {
        errores.push("Comuna es requerida")
        esValido = false
    }

    if (!fechaEntrega) {
        errores.push("Fecha de entrega es requerida")
        esValido = false
    }

    // Validar información de pago
    const numeroTarjeta = document.getElementById("numero-tarjeta").value.replace(/\s/g, "")
    const fechaVencimiento = document.getElementById("fecha-vencimiento").value
    const cvv = document.getElementById("cvv").value
    const nombreTitular = document.getElementById("nombre-titular").value.trim()

    if (!validarNumeroTarjeta(numeroTarjeta)) {
        esValido = false
    }

    if (!validarFechaVencimiento(fechaVencimiento)) {
        esValido = false
    }

    if (!validarCVV(cvv)) {
        esValido = false
    }

    if (!validarNombreTitular(nombreTitular)) {
        esValido = false
    }

    return { esValido, errores }
}

// Procesar pago
function procesarPago() {
    const validacion = validarFormularioCompleto()

    if (!validacion.esValido) {
        alert("Por favor corrige los errores en el formulario:\n\n" + validacion.errores.join("\n"))
        return
    }

    // Mostrar modal de procesamiento
    const modalProcesando = document.getElementById("modal-procesando")
    modalProcesando.classList.add("active")

    // Deshabilitar botón
    const btnFinalizar = document.getElementById("btn-finalizar-compra")
    btnFinalizar.disabled = true
    btnFinalizar.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Procesando...'

    // Simular procesamiento de pago (3 segundos)
    setTimeout(() => {
        // Generar número de pedido
        const numeroPedido = generarNumeroPedido()

        // Guardar datos del pedido
        const datosCompra = {
            numeroPedido: numeroPedido,
            fecha: new Date().toISOString(),
            productos: carritoCheckout,
            cliente: {
                nombre: document.getElementById("nombre-completo").value,
                email: document.getElementById("email").value,
                telefono: document.getElementById("telefono").value,
                direccion: document.getElementById("direccion").value,
                comuna: document.getElementById("comuna").value,
                fechaEntrega: document.getElementById("fecha-entrega").value,
            },
            totales: calcularTotales(),
        }

        // Guardar en localStorage
        localStorage.setItem("ultimaCompra", JSON.stringify(datosCompra))

        // Limpiar carrito
        localStorage.removeItem("carrito")

        // Redirigir a página de confirmación
        window.location.href = `confirmacion.html?pedido=${numeroPedido}`
    }, 3000)
}

// Generar número de pedido único
function generarNumeroPedido() {
    const fecha = new Date()
    const año = fecha.getFullYear().toString().slice(-2)
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0")
    const dia = fecha.getDate().toString().padStart(2, "0")
    const random = Math.floor(Math.random() * 9999)
        .toString()
        .padStart(4, "0")

    return `MS${año}${mes}${dia}${random}`
}

// Calcular totales
function calcularTotales() {
    const subtotal = carritoCheckout.reduce((total, item) => total + item.precio * item.cantidad, 0)
    const envio = subtotal >= ENVIO_GRATIS_MINIMO ? 0 : COSTO_ENVIO
    const total = subtotal + envio - descuentoAplicado

    return {
        subtotal: subtotal,
        envio: envio,
        descuento: descuentoAplicado,
        total: total,
    }
}

// Actualizar contador del carrito
function actualizarContadorCarrito() {
    const cartCount = document.querySelector(".cart-count")
    if (cartCount) {
        const totalItems = carritoCheckout.reduce((total, item) => total + item.cantidad, 0)
        cartCount.textContent = totalItems
        cartCount.style.display = totalItems > 0 ? "flex" : "none"
    }
}

// Formatear precio
function formatearPrecio(precio) {
    return `$${precio.toLocaleString("es-CL")}`
}

// Escuchar cambios en el localStorage
window.addEventListener("storage", (e) => {
    if (e.key === "carrito") {
        carritoCheckout = JSON.parse(e.newValue) || []
        if (carritoCheckout.length === 0) {
            alert("Tu carrito se ha vaciado. Serás redirigido al catálogo.")
            window.location.href = "catalogo.html"
        } else {
            cargarResumenPedido()
            actualizarContadorCarrito()
        }
    }
})
