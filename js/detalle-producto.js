const productosData = [
    // Tortas Cuadradas
    {
        codigo: "TC001",
        categoria: "tortas-cuadradas",
        nombre: "Torta Cuadrada de Chocolate",
        precio: 45000,
        descripcion:
            "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.",
        imagen: "img/torta-cuadrada-chocolate-ganache.jpg",
        icono: "fa-solid fa-birthday-cake",
    },
    {
        codigo: "TC002",
        categoria: "tortas-cuadradas",
        nombre: "Torta Cuadrada de Frutas",
        precio: 50000,
        descripcion:
            "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.",
        imagen: "img/torta-cuadrada-frutas-crema-chantilly.jpg",
        icono: "fa-solid fa-birthday-cake",
    },

    // Tortas Circulares
    {
        codigo: "TT001",
        categoria: "tortas-circulares",
        nombre: "Torta Circular de Vainilla",
        precio: 40000,
        descripcion:
            "Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.",
        imagen: "img/torta-circular-vainilla.jpg",
        icono: "fa-solid fa-birthday-cake",
    },
    {
        codigo: "TT002",
        categoria: "tortas-circulares",
        nombre: "Torta Circular de Manjar",
        precio: 42000,
        descripcion:
            "Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.",
        imagen: "img/torta-circular-manjar.jpg",
        icono: "fa-solid fa-birthday-cake",
    },

    // Postres Individuales
    {
        codigo: "PI001",
        categoria: "postres-individuales",
        nombre: "Mousse de Chocolate",
        precio: 5000,
        descripcion:
            "Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate.",
        imagen: "img/mousse-chocolate-cremoso-individual.jpg",
        icono: "fa-solid fa-ice-cream",
    },
    {
        codigo: "PI002",
        categoria: "postres-individuales",
        nombre: "Tiramisú Clásico",
        precio: 5500,
        descripcion:
            "Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.",
        imagen: "img/tiramisu-italiano-cafe-mascarpone.jpg",
        icono: "fa-solid fa-ice-cream",
    },

    // Productos Sin Azúcar
    {
        codigo: "PSA001",
        categoria: "sin-azucar",
        nombre: "Torta Sin Azúcar de Naranja",
        precio: 48000,
        descripcion: "Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables.",
        imagen: "img/torta-naranja-sin-azucar-saludable.jpg",
        icono: "fa-solid fa-leaf",
    },
    {
        codigo: "PSA002",
        categoria: "sin-azucar",
        nombre: "Cheesecake Sin Azúcar",
        precio: 47000,
        descripcion: "Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.",
        imagen: "img/cheesecake.jpg",
        icono: "fa-solid fa-leaf",
    },

    // Pastelería Tradicional
    {
        codigo: "PT001",
        categoria: "tradicional",
        nombre: "Empanada de Manzana",
        precio: 3000,
        descripcion: "Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda.",
        imagen: "img/empanadas-manzana.jpg",
        icono: "fa-solid fa-bread-slice",
    },
    {
        codigo: "PT002",
        categoria: "tradicional",
        nombre: "Tarta de Santiago",
        precio: 6000,
        descripcion:
            "Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos.",
        imagen: "img/tarta-santiago-almendras-espa-ola.jpg",
        icono: "fa-solid fa-bread-slice",
    },

    // Productos Sin Gluten
    {
        codigo: "PG001",
        categoria: "sin-gluten",
        nombre: "Brownie Sin Gluten",
        precio: 4000,
        descripcion:
            "Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor.",
        imagen: "img/brownie-sin-gluten-denso-chocolate.jpg",
        icono: "fa-solid fa-wheat-awn-circle-exclamation",
    },
    {
        codigo: "PG002",
        categoria: "sin-gluten",
        nombre: "Pan Sin Gluten",
        precio: 3500,
        descripcion: "Suave y esponjoso, ideal para sándwiches o para acompañar cualquier comida.",
        imagen: "img/pan-sin-gluten-esponjoso.jpg",
        icono: "fa-solid fa-wheat-awn-circle-exclamation",
    },

    // Productos Vegana
    {
        codigo: "PV001",
        categoria: "vegana",
        nombre: "Torta Vegana de Chocolate",
        precio: 50000,
        descripcion: "Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos.",
        imagen: "img/torta-vegana-chocolate-sin-productos-animales.jpg",
        icono: "fa-solid fa-seedling",
    },
    {
        codigo: "PV002",
        categoria: "vegana",
        nombre: "Galletas Veganas de Avena",
        precio: 4500,
        descripcion: "Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano.",
        imagen: "img/galletas-veganas-avena-crujientes.jpg",
        icono: "fa-solid fa-seedling",
    },

    // Tortas Especiales
    {
        codigo: "TE001",
        categoria: "especiales",
        nombre: "Torta Especial de Cumpleaños",
        precio: 55000,
        descripcion: "Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.",
        imagen: "img/torta-cumplea-os-especial-decorada-personalizada.jpg",
        icono: "fa-solid fa-gift",
    },
    {
        codigo: "TE002",
        categoria: "especiales",
        nombre: "Torta Especial de Boda",
        precio: 60000,
        descripcion: "Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.",
        imagen: "img/torta-boda-especial.jpg",
        icono: "fa-solid fa-gift",
    },
]

const productos = productosData

// Variables globales
let productoActual = null
const carrito = JSON.parse(localStorage.getItem("carrito")) || []

// Función para agregar producto directamente al carrito
function agregarProductoDirecto(codigoProducto) {
    const producto = productos.find((p) => p.codigo === codigoProducto)
    if (!producto) return

    const itemExistente = carrito.find((item) => item.codigo === codigoProducto)

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

    mostrarNotificacion(`${producto.nombre} agregada al carrito`)
}

// 1. Función para renderizar el producto en el HTML
function mostrarProducto(producto) {
    if (!producto) {
        mostrarErrorProducto()
        return
    }

    productoActual = producto

    // Actualizar información del producto
    document.getElementById("nombre-producto").textContent = producto.nombre
    document.getElementById("precio-producto").textContent = `$${producto.precio.toLocaleString("es-CL")}`
    document.getElementById("descripcion-producto").textContent = producto.descripcion
    document.getElementById("codigo-producto").textContent = producto.codigo
    document.getElementById("categoria-producto").textContent = obtenerNombreCategoria(producto.categoria)
    document.getElementById("historia-producto").textContent =
        producto.historia ||
        "Una deliciosa creación de nuestra pastelería, elaborada con ingredientes frescos y mucho amor."

    // Actualizar imagen
    const img = document.querySelector(".img-detalle-producto")
    img.src = producto.imagen
    img.alt = producto.nombre

    // Actualizar breadcrumb
    document.getElementById("breadcrumb-producto").textContent = producto.nombre

    // Actualizar título de la página
    document.title = `${producto.nombre} - Mil Sabores`

    // Configurar botón de agregar al carrito
    const btnAgregar = document.getElementById("btn-agregar-carrito")
    btnAgregar.onclick = () => agregarAlCarrito(producto.codigo)

    // Agregar animación de entrada
    document.querySelector(".container").classList.add("fade-in")
}

// 2. Función para obtener el nombre de la categoría
function obtenerNombreCategoria(categoria) {
    const categorias = {
        "tortas-cuadradas": "Tortas Cuadradas",
        "tortas-circulares": "Tortas Circulares",
        "postres-individuales": "Postres Individuales",
        "sin-azucar": "Sin Azúcar",
        tradicional: "Tradicional",
        "sin-gluten": "Sin Gluten",
        vegana: "Vegana",
        especiales: "Especiales",
    }
    return categorias[categoria] || "Desconocida"
}

// 3. Función para mostrar error cuando no se encuentra el producto
function mostrarErrorProducto() {
    document.getElementById("nombre-producto").textContent = "Producto no encontrado"
    document.getElementById("precio-producto").textContent = ""
    document.getElementById("descripcion-producto").textContent =
        "Lo sentimos, el producto que buscas no está disponible."
    document.getElementById("codigo-producto").textContent = "-"
    document.getElementById("categoria-producto").textContent = "-"
    document.getElementById("historia-producto").textContent = ""

    const btnAgregar = document.getElementById("btn-agregar-carrito")
    btnAgregar.style.display = "none"
}

// 4. Función para obtener productos aleatorios para "También te puede interesar"
function obtenerRecomendados(lista, productoActual, cantidad = 6) {
    const listaFiltrada = productoActual ? lista.filter((p) => p.codigo !== productoActual.codigo) : lista
    return listaFiltrada.sort(() => Math.random() - 0.5).slice(0, cantidad)
}

// 5. Renderizar los productos recomendados
function renderizarRecomendados(productoActual) {
    const contenedorRecomendados = document.getElementById("recomendados")
    const recomendados = obtenerRecomendados(productos, productoActual, 6)
    let htmlRecomendados = ""

    recomendados.forEach((prod) => {
        htmlRecomendados += `
                <div class="col-6 col-md-4 mb-4">
                    <div class="card h-100">
                        <img src="${prod.imagen}" class="card-img-top img-recomendado" alt="${prod.nombre}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${prod.nombre}</h5>
                            <p class="fw-bold fs-5 text-success">$${prod.precio.toLocaleString("es-CL")}</p>
                            <a href="detalle-producto.html?codigo=${prod.codigo}" class="btn btn-ver-detalles mt-auto">Ver detalles</a>
                        </div>
                    </div>
                </div>
            `
    })
    contenedorRecomendados.innerHTML = htmlRecomendados
}

// 6. Lógica principal para cargar el producto
function cargarProducto() {
    // Mostrar estado de carga
    document.querySelector(".container").classList.add("loading")

    // Intenta obtener el código del parámetro de la URL
    const params = new URLSearchParams(window.location.search)
    let codigoProducto = params.get("codigo")

    // Si no hay parámetro, intenta obtenerlo del hash
    if (!codigoProducto) {
        codigoProducto = window.location.hash.substring(1)
    }

    // Busca el producto, o usa el primero si no se encuentra ninguno
    const productoSeleccionado = productos.find((p) => p.codigo === codigoProducto) || productos[0]

    // Simular pequeña carga para mejor UX
    setTimeout(() => {
        // Llama a las funciones para mostrar y renderizar los productos
        mostrarProducto(productoSeleccionado)
        renderizarRecomendados(productoSeleccionado)

        // Remover estado de carga
        document.querySelector(".container").classList.remove("loading")

        // Desplaza la ventana al principio de la página
        window.scrollTo({ top: 0, behavior: "smooth" })

        // Actualizar contador del carrito
        actualizarContadorCarrito()
    }, 300)
}

// 7. Función para agregar al carrito (integrada con el sistema existente)
function agregarAlCarrito(codigoProducto) {
    const producto = productos.find((p) => p.codigo === codigoProducto)
    if (!producto) return

    // Verificar si es una torta (categorías que requieren personalización)
    const categoriasTortas = ["tortas-cuadradas", "tortas-circulares", "especiales"]

    if (categoriasTortas.includes(producto.categoria)) {
        mostrarModalPersonalizacion(codigoProducto)
    } else {
        // Para productos que no son tortas, agregar directamente
        agregarProductoDirecto(codigoProducto)
    }
}

// 8. Funciones del sistema de personalización (copiadas del catálogo)
function mostrarModalPersonalizacion(codigoProducto) {
    const producto = productos.find((p) => p.codigo === codigoProducto)
    if (!producto) {
        console.error("Producto no encontrado:", codigoProducto)
        return
    }

    // Crear modal de confirmación
    const modalConfirmacion = document.createElement("div")
    modalConfirmacion.className = "modal-confirmacion-overlay"
    modalConfirmacion.innerHTML = `
        <div class="modal-confirmacion">
            <div class="modal-confirmacion-header">
                <h3>¿Deseas personalizar tu torta?</h3>
                <button class="modal-close-btn" onclick="cerrarModalConfirmacion()">&times;</button>
            </div>
            <div class="modal-confirmacion-body">
                <div class="producto-preview">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <div>
                        <h4>${producto.nombre}</h4>
                        <p class="precio">${formatearPrecio(producto.precio)}</p>
                    </div>
                </div>
                <p>Las tortas pueden personalizarse con mensaje especial, cantidad de personas y color del glaseado.</p>
            </div>
            <div class="modal-confirmacion-footer">
                <button class="btn-secundario" onclick="agregarSinPersonalizar('${codigoProducto}')">
                    No, agregar con valores por defecto
                </button>
                <button class="btn-primario" onclick="abrirFormularioPersonalizacion('${codigoProducto}')">
                    Sí, personalizar mi torta
                </button>
            </div>
        </div>
    `

    document.body.appendChild(modalConfirmacion)
    document.body.style.overflow = "hidden"
}

function cerrarModalConfirmacion() {
    const modal = document.querySelector(".modal-confirmacion-overlay")
    if (modal) {
        document.body.removeChild(modal)
        document.body.style.overflow = "auto"
    }
}

function agregarSinPersonalizar(codigoProducto) {
    cerrarModalConfirmacion()
    agregarProductoDirecto(codigoProducto)
}

function abrirFormularioPersonalizacion(codigoProducto) {
    cerrarModalConfirmacion()
    const producto = productos.find((p) => p.codigo === codigoProducto)
    if (!producto) {
        console.error("Producto no encontrado para personalización:", codigoProducto)
        return
    }

    const modalPersonalizacion = document.createElement("div")
    modalPersonalizacion.className = "modal-personalizacion-overlay"
    modalPersonalizacion.innerHTML = `
    <div class="modal-personalizacion">
        <div class="modal-personalizacion-header">
        <h3>Personalizar ${producto.nombre}</h3>
        <button class="modal-close-btn" onclick="cerrarModalPersonalizacion()">&times;</button>
      </div>
      <div class="modal-personalizacion-body">
        <div class="producto-info">
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <div>
            <h4>${producto.nombre}</h4>
            <p class="precio-base">Precio base: ${formatearPrecio(producto.precio)}</p>
          </div>
        </div>
        
        <form id="form-personalizacion" class="form-personalizacion">
          <div class="campo-grupo">
            <label for="cantidad-personas">Cantidad de personas *</label>
            <select id="cantidad-personas" required>
              <option value="">Selecciona el tamaño</option>
              <option value="pequeno" data-precio="0.8">Pequeño (4-6 personas) - 20% menos</option>
              <option value="estandar" data-precio="1" selected>Estándar (${producto.cantidadPersonas}) - Precio base</option>
              <option value="grande" data-precio="1.3">Grande (12-15 personas) - 30% más</option>
              <option value="extra-grande" data-precio="1.6">Extra Grande (18-20 personas) - 60% más</option>
            </select>
            <span class="error-mensaje" id="error-cantidad"></span>
          </div>

          <div class="campo-grupo">
            <label for="mensaje-especial">Mensaje especial (opcional)</label>
            <input type="text" id="mensaje-especial" maxlength="50" placeholder="Ej: Feliz Cumpleaños María">
            <small class="contador-caracteres">0/50 caracteres</small>
            <span class="error-mensaje" id="error-mensaje"></span>
          </div>

          <div class="campo-grupo">
            <label for="color-glaseado">Color del glaseado *</label>
            <select id="color-glaseado" required>
              <option value="">Selecciona un color</option>
              <option value="blanco">Blanco clásico</option>
              <option value="chocolate">Chocolate</option>
              <option value="rosa">Rosa</option>
              <option value="azul">Azul</option>
              <option value="amarillo">Amarillo</option>
              <option value="verde">Verde</option>
              <option value="morado">Morado</option>
            </select>
            <span class="error-mensaje" id="error-color"></span>
          </div>

          <div class="precio-final">
            <strong>Precio final: <span id="precio-calculado">${formatearPrecio(producto.precio)}</span></strong>
          </div>
        </form>
      </div>
      <div class="modal-personalizacion-footer">
        <button type="button" class="btn-secundario" onclick="cerrarModalPersonalizacion()">
          Cancelar
        </button>
        <button type="button" class="btn-primario" onclick="validarYAgregarPersonalizado('${codigoProducto}')">
          Agregar al carrito
        </button>
      </div>
    </div>
  `

    document.body.appendChild(modalPersonalizacion)
    document.body.style.overflow = "hidden"

    // Configurar eventos para el formulario
    configurarEventosPersonalizacion(producto.precio)
}

function configurarEventosPersonalizacion(precioBase) {
    const cantidadSelect = document.getElementById("cantidad-personas")
    const mensajeInput = document.getElementById("mensaje-especial")
    const contadorCaracteres = document.querySelector(".contador-caracteres")
    const precioCalculado = document.getElementById("precio-calculado")

    // Actualizar precio cuando cambia la cantidad
    cantidadSelect.addEventListener("change", function () {
        const multiplicador = this.selectedOptions[0]?.dataset.precio || 1
        const nuevoPrecio = precioBase * Number.parseFloat(multiplicador)
        precioCalculado.textContent = formatearPrecio(nuevoPrecio)
    })

    // Contador de caracteres para mensaje
    mensajeInput.addEventListener("input", function () {
        const longitud = this.value.length
        contadorCaracteres.textContent = `${longitud}/50 caracteres`
        contadorCaracteres.style.color = longitud > 40 ? "#e74c3c" : "#666"
    })
}

function validarYAgregarPersonalizado(codigoProducto) {
    const cantidadPersonas = document.getElementById("cantidad-personas").value
    const mensajeEspecial = document.getElementById("mensaje-especial").value.trim()
    const colorGlaseado = document.getElementById("color-glaseado").value

    // Limpiar errores previos
    document.querySelectorAll(".error-mensaje").forEach((el) => (el.textContent = ""))
    document.querySelectorAll(".campo-grupo").forEach((el) => el.classList.remove("error"))

    let hayErrores = false

    // Validar cantidad de personas
    if (!cantidadPersonas) {
        document.getElementById("error-cantidad").textContent = "Debes seleccionar la cantidad de personas"
        document.querySelector("#cantidad-personas").closest(".campo-grupo").classList.add("error")
        hayErrores = true
    }

    // Validar color del glaseado
    if (!colorGlaseado) {
        document.getElementById("error-color").textContent = "Debes seleccionar un color para el glaseado"
        document.querySelector("#color-glaseado").closest(".campo-grupo").classList.add("error")
        hayErrores = true
    }

    // Validar mensaje especial (opcional pero con límite)
    if (mensajeEspecial.length > 50) {
        document.getElementById("error-mensaje").textContent = "El mensaje no puede exceder 50 caracteres"
        document.querySelector("#mensaje-especial").closest(".campo-grupo").classList.add("error")
        hayErrores = true
    }

    if (hayErrores) {
        return
    }

    // Si todo está correcto, agregar al carrito
    const producto = productos.find((p) => p.codigo === codigoProducto)
    const multiplicador = document.getElementById("cantidad-personas").selectedOptions[0].dataset.precio
    const precioFinal = producto.precio * Number.parseFloat(multiplicador)

    const itemExistente = carrito.find(
        (item) =>
            item.codigo === codigoProducto &&
            item.cantidadPersonas === cantidadPersonas &&
            item.mensajeEspecial === mensajeEspecial &&
            item.colorGlaseado === colorGlaseado,
    )

    if (itemExistente) {
        itemExistente.cantidad += 1
    } else {
        carrito.push({
            ...producto,
            cantidad: 1,
            cantidadPersonas: cantidadPersonas,
            mensajeEspecial: mensajeEspecial,
            colorGlaseado: colorGlaseado,
            precio: precioFinal, // Precio personalizado
        })
    }

    localStorage.setItem("carrito", JSON.stringify(carrito))
    actualizarContadorCarrito()

    let mensaje = `${producto.nombre} personalizada agregada al carrito`
    if (mensajeEspecial) {
        mensaje += ` con mensaje: "${mensajeEspecial}"`
    }

    mostrarNotificacion(mensaje)
    cerrarModalPersonalizacion()
}

// 9. Actualizar contador del carrito
function actualizarContadorCarrito() {
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0)
    const cartCount = document.querySelector(".cart-count")
    if (cartCount) {
        cartCount.textContent = totalItems
        cartCount.style.display = totalItems > 0 ? "flex" : "none"
    }
}

// 10. Mostrar notificación
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
            if (document.body.contains(notificacion)) {
                document.body.removeChild(notificacion)
            }
        }, 300)
    }, 3000)
}

// Función para formatear el precio
function formatearPrecio(precio) {
    return `$${precio.toLocaleString("es-CL")}`
}

// Event listeners para manejar los clics y la carga inicial
document.addEventListener("DOMContentLoaded", cargarProducto)

// Event listener para manejar la navegación con el botón de retroceso
window.addEventListener("popstate", cargarProducto)

// Función para cerrar el modal de personalización
function cerrarModalPersonalizacion() {
    const modal = document.querySelector(".modal-personalizacion-overlay")
    if (modal) {
        document.body.removeChild(modal)
        document.body.style.overflow = "auto"
    }
}
