// Variables globales
let carritoActual = JSON.parse(localStorage.getItem("carrito")) || []
let productoAEliminar = null
const productosData = [] // Declare productosData variable

// Elementos del DOM
const carritoVacio = document.getElementById("carrito-vacio")
const carritoConProductos = document.getElementById("carrito-con-productos")
const listaProductosCarrito = document.getElementById("lista-productos-carrito")
const subtotalElement = document.getElementById("subtotal")
const totalFinalElement = document.getElementById("total-final")
const costoEnvioElement = document.getElementById("costo-envio")
const descuentoElement = document.getElementById("descuento")
const listaRecomendados = document.getElementById("lista-recomendados")

// Constantes
const COSTO_ENVIO = 3000
const ENVIO_GRATIS_MINIMO = 50000

// Inicializar página
document.addEventListener("DOMContentLoaded", () => {
    cargarCarrito()
    cargarProductosRecomendados()
    configurarEventListeners()
})

// Configurar event listeners
function configurarEventListeners() {
    // Limpiar carrito
    document.getElementById("limpiar-carrito")?.addEventListener("click", limpiarCarrito)

    // Aplicar código de descuento
    document.getElementById("aplicar-codigo")?.addEventListener("click", aplicarCodigoDescuento)

    // Proceder al pago
    document.getElementById("proceder-pago")?.addEventListener("click", procederAlPago)

    // Cerrar modales
    document.querySelectorAll(".modal-close").forEach((btn) => {
        btn.addEventListener("click", cerrarModales)
    })

    // Cerrar modal al hacer click fuera
    document.querySelectorAll(".modal-overlay").forEach((modal) => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                cerrarModales()
            }
        })
    })
}

// Cargar carrito
function cargarCarrito() {
    carritoActual = JSON.parse(localStorage.getItem("carrito")) || []

    if (carritoActual.length === 0) {
        mostrarCarritoVacio()
    } else {
        mostrarCarritoConProductos()
    }

    actualizarContadorCarrito()
}

// Mostrar carrito vacío
function mostrarCarritoVacio() {
    carritoVacio.style.display = "block"
    carritoConProductos.style.display = "none"
}

// Mostrar carrito con productos
function mostrarCarritoConProductos() {
    carritoVacio.style.display = "none"
    carritoConProductos.style.display = "block"

    renderizarProductosCarrito()
    calcularTotales()
}

// Renderizar productos del carrito
function renderizarProductosCarrito() {
    listaProductosCarrito.innerHTML = carritoActual
        .map((item, index) => {
            const personalizacion = obtenerTextoPersonalizacion(item)

            return `
                <div class="carrito-item" data-index="${index}">
                    <div class="item-imagen">
                        <img src="${item.imagen}" alt="${item.nombre}" loading="lazy">
                    </div>
                    
                    <div class="item-info">
                        <div class="item-nombre">${item.nombre}</div>
                        <div class="item-descripcion">${item.descripcion}</div>
                        ${personalizacion ? `<div class="item-personalizacion">${personalizacion}</div>` : ""}
                    </div>
                    
                    <div class="item-cantidad">
                        <button class="btn-cantidad" onclick="cambiarCantidad(${index}, -1)" ${item.cantidad <= 1 ? "disabled" : ""}>
                            <i class="fa-solid fa-minus"></i>
                        </button>
                        <input type="number" class="cantidad-input" value="${item.cantidad}" 
                            onchange="actualizarCantidad(${index}, this.value)" min="1" max="99">
                        <button class="btn-cantidad" onclick="cambiarCantidad(${index}, 1)">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                    
                    <div class="item-precio">
                        ${formatearPrecio(item.precio * item.cantidad)}
                    </div>
                    
                    <div class="item-acciones">
                        ${esProductoPersonalizable(item)
                    ? `
                            <button class="btn-accion btn-personalizar" onclick="editarPersonalizacion(${index})">
                                <i class="fa-solid fa-edit"></i>
                                Editar
                            </button>
                        `
                    : ""
                }
                        <button class="btn-accion btn-eliminar-item" onclick="eliminarProducto(${index})">
                            <i class="fa-solid fa-trash"></i>
                            Eliminar
                        </button>
                    </div>
                </div>
            `
        })
        .join("")
}

// Obtener texto de personalización
function obtenerTextoPersonalizacion(item) {
    const personalizaciones = []

    if (item.cantidadPersonas) {
        const tamaños = {
            pequeno: "Pequeño (4-6 personas)",
            estandar: `Estándar (${item.cantidadPersonas})`,
            grande: "Grande (12-15 personas)",
            "extra-grande": "Extra Grande (18-20 personas)",
        }
        personalizaciones.push(`<strong>Tamaño:</strong> ${tamaños[item.cantidadPersonas] || item.cantidadPersonas}`)
    }

    if (item.mensajeEspecial) {
        personalizaciones.push(`<strong>Mensaje:</strong> "${item.mensajeEspecial}"`)
    }

    if (item.colorGlaseado) {
        personalizaciones.push(`<strong>Glaseado:</strong> ${item.colorGlaseado}`)
    }

    return personalizaciones.join(" • ")
}

// Verificar si un producto es personalizable
function esProductoPersonalizable(item) {
    const categoriasTortas = ["tortas-cuadradas", "tortas-circulares", "especiales"]
    return categoriasTortas.includes(item.categoria)
}

// Cambiar cantidad de producto
function cambiarCantidad(index, cambio) {
    const nuevaCantidad = carritoActual[index].cantidad + cambio
    if (nuevaCantidad >= 1 && nuevaCantidad <= 99) {
        carritoActual[index].cantidad = nuevaCantidad
        guardarCarrito()
        renderizarProductosCarrito()
        calcularTotales()
        actualizarContadorCarrito()
    }
}

// Actualizar cantidad directamente
function actualizarCantidad(index, nuevaCantidad) {
    const cantidad = Number.parseInt(nuevaCantidad)
    if (cantidad >= 1 && cantidad <= 99) {
        carritoActual[index].cantidad = cantidad
        guardarCarrito()
        renderizarProductosCarrito()
        calcularTotales()
        actualizarContadorCarrito()
    }
}

// Eliminar producto del carrito
function eliminarProducto(index) {
    productoAEliminar = index
    document.getElementById("modal-confirmar-eliminar").classList.add("active")
}

// Confirmar eliminación
function confirmarEliminacion() {
    if (productoAEliminar !== null) {
        carritoActual.splice(productoAEliminar, 1)
        guardarCarrito()

        if (carritoActual.length === 0) {
            mostrarCarritoVacio()
        } else {
            renderizarProductosCarrito()
            calcularTotales()
        }

        actualizarContadorCarrito()
        cerrarModalEliminar()
        mostrarNotificacion("Producto eliminado del carrito")
    }
}

// Cerrar modal de eliminar
function cerrarModalEliminar() {
    document.getElementById("modal-confirmar-eliminar").classList.remove("active")
    productoAEliminar = null
}

// Editar personalización
function editarPersonalizacion(index) {
    const item = carritoActual[index]
    // Reutilizar la lógica del catálogo para personalización
    mostrarFormularioPersonalizacionEditar(item, index)
}

// Mostrar formulario de personalización para editar
function mostrarFormularioPersonalizacionEditar(producto, index) {
    const modalPersonalizar = document.getElementById("modal-personalizar")
    const modalContent = modalPersonalizar.querySelector(".modal-content")

    modalContent.innerHTML = `
            <div class="modal-header">
                <h3>Editar personalización</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="producto-info">
                    <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 80px; height: 80px; border-radius: 8px; object-fit: cover;">
                    <div>
                        <h4>${producto.nombre}</h4>
                        <p class="precio-base">Precio base: ${formatearPrecio(producto.precio / (producto.cantidadPersonas === "pequeno" ? 0.8 : producto.cantidadPersonas === "grande" ? 1.3 : producto.cantidadPersonas === "extra-grande" ? 1.6 : 1))}</p>
                    </div>
                </div>
                
                <form id="form-editar-personalizacion" class="form-personalizacion">
                    <div class="campo-grupo">
                        <label for="cantidad-personas-edit">Cantidad de personas *</label>
                        <select id="cantidad-personas-edit" required>
                            <option value="pequeno" data-precio="0.8" ${producto.cantidadPersonas === "pequeno" ? "selected" : ""}>Pequeño (4-6 personas) - 20% menos</option>
                            <option value="estandar" data-precio="1" ${producto.cantidadPersonas === "estandar" ? "selected" : ""}>Estándar - Precio base</option>
                            <option value="grande" data-precio="1.3" ${producto.cantidadPersonas === "grande" ? "selected" : ""}>Grande (12-15 personas) - 30% más</option>
                            <option value="extra-grande" data-precio="1.6" ${producto.cantidadPersonas === "extra-grande" ? "selected" : ""}>Extra Grande (18-20 personas) - 60% más</option>
                        </select>
                    </div>

                    <div class="campo-grupo">
                        <label for="mensaje-especial-edit">Mensaje especial (opcional)</label>
                        <input type="text" id="mensaje-especial-edit" maxlength="50" value="${producto.mensajeEspecial || ""}" placeholder="Ej: Feliz Cumpleaños María">
                        <small class="contador-caracteres">${(producto.mensajeEspecial || "").length}/50 caracteres</small>
                    </div>

                    <div class="campo-grupo">
                        <label for="color-glaseado-edit">Color del glaseado *</label>
                        <select id="color-glaseado-edit" required>
                            <option value="blanco" ${producto.colorGlaseado === "blanco" ? "selected" : ""}>Blanco clásico</option>
                            <option value="chocolate" ${producto.colorGlaseado === "chocolate" ? "selected" : ""}>Chocolate</option>
                            <option value="rosa" ${producto.colorGlaseado === "rosa" ? "selected" : ""}>Rosa</option>
                            <option value="azul" ${producto.colorGlaseado === "azul" ? "selected" : ""}>Azul</option>
                            <option value="amarillo" ${producto.colorGlaseado === "amarillo" ? "selected" : ""}>Amarillo</option>
                            <option value="verde" ${producto.colorGlaseado === "verde" ? "selected" : ""}>Verde</option>
                            <option value="morado" ${producto.colorGlaseado === "morado" ? "selected" : ""}>Morado</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn-secundario" onclick="cerrarModales()">Cancelar</button>
                <button type="button" class="btn-primario" onclick="guardarPersonalizacionEditada(${index})">Guardar cambios</button>
            </div>
        `

    modalPersonalizar.classList.add("active")

    // Configurar eventos
    const mensajeInput = document.getElementById("mensaje-especial-edit")
    const contadorCaracteres = document.querySelector(".contador-caracteres")

    mensajeInput.addEventListener("input", function () {
        const longitud = this.value.length
        contadorCaracteres.textContent = `${longitud}/50 caracteres`
        contadorCaracteres.style.color = longitud > 40 ? "#e74c3c" : "#666"
    })
}

// Guardar personalización editada
function guardarPersonalizacionEditada(index) {
    const cantidadPersonas = document.getElementById("cantidad-personas-edit").value
    const mensajeEspecial = document.getElementById("mensaje-especial-edit").value.trim()
    const colorGlaseado = document.getElementById("color-glaseado-edit").value

    if (!cantidadPersonas || !colorGlaseado) {
        alert("Por favor completa todos los campos obligatorios")
        return
    }

    // Calcular nuevo precio
    const precioBase =
        carritoActual[index].precio /
        (carritoActual[index].cantidadPersonas === "pequeno"
            ? 0.8
            : carritoActual[index].cantidadPersonas === "grande"
                ? 1.3
                : carritoActual[index].cantidadPersonas === "extra-grande"
                    ? 1.6
                    : 1)

    const multiplicador = document.getElementById("cantidad-personas-edit").selectedOptions[0].dataset.precio
    const nuevoPrecio = precioBase * Number.parseFloat(multiplicador)

    // Actualizar producto
    carritoActual[index].cantidadPersonas = cantidadPersonas
    carritoActual[index].mensajeEspecial = mensajeEspecial
    carritoActual[index].colorGlaseado = colorGlaseado
    carritoActual[index].precio = nuevoPrecio

    guardarCarrito()
    renderizarProductosCarrito()
    calcularTotales()
    cerrarModales()
    mostrarNotificacion("Personalización actualizada")
}

// Limpiar carrito
function limpiarCarrito() {
    if (confirm("¿Estás seguro de que deseas eliminar todos los productos del carrito?")) {
        carritoActual = []
        guardarCarrito()
        mostrarCarritoVacio()
        actualizarContadorCarrito()
        mostrarNotificacion("Carrito limpiado")
    }
}

// Calcular totales
function calcularTotales() {
    const subtotal = carritoActual.reduce((total, item) => total + item.precio * item.cantidad, 0)
    const envio = subtotal >= ENVIO_GRATIS_MINIMO ? 0 : COSTO_ENVIO
    const descuento = Number.parseFloat(document.getElementById("descuento").textContent.replace(/[^0-9.-]/g, "")) || 0
    const total = subtotal + envio - Math.abs(descuento)

    subtotalElement.textContent = formatearPrecio(subtotal)
    costoEnvioElement.textContent = envio === 0 ? "GRATIS" : formatearPrecio(envio)
    totalFinalElement.textContent = formatearPrecio(total)

    // Mostrar mensaje de envío gratis
    if (subtotal >= ENVIO_GRATIS_MINIMO && envio === 0) {
        costoEnvioElement.innerHTML = '<span style="color: #27ae60; font-weight: 600;">GRATIS</span>'
    }
}

// Aplicar código de descuento
function aplicarCodigoDescuento() {
    const codigo = document.getElementById("input-codigo").value.trim().toUpperCase()
    const descuentoLinea = document.querySelector(".linea-resumen.descuento")

    const codigosValidos = {
        DULCE10: 0.1,
        PRIMERA15: 0.15,
        CUMPLE20: 0.2,
        FAMILIA25: 0.25,
    }

    if (codigosValidos[codigo]) {
        const subtotal = carritoActual.reduce((total, item) => total + item.precio * item.cantidad, 0)
        const descuentoMonto = subtotal * codigosValidos[codigo]

        descuentoElement.textContent = `-${formatearPrecio(descuentoMonto)}`
        descuentoLinea.style.display = "flex"

        calcularTotales()
        mostrarNotificacion(`Código ${codigo} aplicado correctamente`)
        document.getElementById("input-codigo").value = ""
    } else {
        alert("Código de descuento no válido")
    }
}

// Cargar productos recomendados
function cargarProductosRecomendados() {
    // Obtener productos aleatorios que no estén en el carrito
    const productosEnCarrito = carritoActual.map((item) => item.codigo)
    const productosDisponibles = productosData.filter((producto) => !productosEnCarrito.includes(producto.codigo))

    // Seleccionar 3 productos aleatorios
    const recomendados = productosDisponibles.sort(() => Math.random() - 0.5).slice(0, 3)

    listaRecomendados.innerHTML = recomendados
        .map(
            (producto) => `
            <div class="recomendado-item">
                <div class="recomendado-imagen">
                    <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
                </div>
                <div class="recomendado-info">
                    <div class="recomendado-nombre">${producto.nombre}</div>
                    <div class="recomendado-precio">${formatearPrecio(producto.precio)}</div>
                </div>
                <button class="btn-agregar-recomendado" onclick="agregarRecomendado('${producto.codigo}')">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
        `,
        )
        .join("")
}

// Agregar producto recomendado
function agregarRecomendado(codigoProducto) {
    const producto = productosData.find((p) => p.codigo === codigoProducto)
    if (!producto) return

    // Verificar si es una torta que requiere personalización
    const categoriasTortas = ["tortas-cuadradas", "tortas-circulares", "especiales"]

    if (categoriasTortas.includes(producto.categoria)) {
        // Redirigir al catálogo para personalización
        window.location.href = `catalogo.html?producto=${codigoProducto}`
    } else {
        // Agregar directamente
        const itemExistente = carritoActual.find(
            (item) =>
                item.codigo === codigoProducto && !item.cantidadPersonas && !item.mensajeEspecial && !item.colorGlaseado,
        )

        if (itemExistente) {
            itemExistente.cantidad += 1
        } else {
            carritoActual.push({
                ...producto,
                cantidad: 1,
            })
        }

        guardarCarrito()
        cargarCarrito()
        cargarProductosRecomendados()
        mostrarNotificacion(`${producto.nombre} agregado al carrito`)
    }
}

// Proceder al pago
function procederAlPago() {
    if (carritoActual.length === 0) {
        alert("Tu carrito está vacío")
        return
    }

    window.location.href = "checkout.html"
}

// Funciones auxiliares
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carritoActual))

    // Disparar evento personalizado para actualizar otros componentes
    const evento = new CustomEvent("carritoActualizado")
    document.dispatchEvent(evento)
}

function actualizarContadorCarrito() {
    const cartCount = document.querySelector(".cart-count")
    if (cartCount) {
        const totalItems = carritoActual.reduce((total, item) => total + item.cantidad, 0)
        cartCount.textContent = totalItems
        cartCount.style.display = totalItems > 0 ? "flex" : "none"
    }
}

function formatearPrecio(precio) {
    return `$${precio.toLocaleString("es-CL")}`
}

function cerrarModales() {
    document.querySelectorAll(".modal-overlay").forEach((modal) => {
        modal.classList.remove("active")
    })
}

function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement("div")
    notificacion.className = "notificacion"
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
            document.body.removeChild(notificacion)
        }, 300)
    }, 3000)
}

// Escuchar cambios en el localStorage desde otras pestañas
window.addEventListener("storage", (e) => {
    if (e.key === "carrito") {
        cargarCarrito()
        cargarProductosRecomendados()
    }
})
