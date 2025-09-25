// Variables globales
let productosActuales = []
const carrito = JSON.parse(localStorage.getItem("carrito")) || []
const productosData = [
  {
    codigo: "TC001",
    categoria: "tortas-cuadradas",
    nombre: "Torta Cuadrada de Chocolate",
    precio: 45000,
    descripcion:
      "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.",
    imagen: "img/torta-cuadrada-chocolate-ganache.jpg",
    icono: "fa-solid fa-birthday-cake",
    cantidadPersonas: "8-10 personas",
    ingredientes: ["Chocolate", "Huevos", "Harina", "Mantequilla", "Azúcar", "Avellanas"],
    historia: "Una receta familiar transmitida por generaciones, perfeccionada con técnicas modernas de pastelería.",
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
    cantidadPersonas: "8-10 personas",
    ingredientes: ["Frutas frescas", "Crema chantilly", "Bizcocho de vainilla", "Azúcar"],
    historia: "Inspirada en los jardines de frutas de la región, esta torta celebra la frescura de cada temporada.",
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
    cantidadPersonas: "6-8 personas",
    ingredientes: ["Vainilla", "Crema pastelera", "Huevos", "Harina", "Mantequilla"],
    historia: "El clásico que nunca pasa de moda, elaborado con vainilla natural de Madagascar.",
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
    cantidadPersonas: "6-8 personas",
    ingredientes: ["Manjar", "Nueces", "Bizcocho", "Crema"],
    historia: "Una tradición chilena que honra nuestras raíces, con manjar casero preparado diariamente.",
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
    cantidadPersonas: "1 persona",
    ingredientes: ["Chocolate belga", "Crema", "Huevos", "Azúcar"],
    historia: "Inspirado en las técnicas francesas, nuestro mousse es una experiencia de puro chocolate.",
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
    cantidadPersonas: "1 persona",
    ingredientes: ["Mascarpone", "Café espresso", "Bizcochos", "Cacao", "Licor"],
    historia: "Directamente desde Italia, preparado con café espresso auténtico y mascarpone importado.",
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
    cantidadPersonas: "8-10 personas",
    ingredientes: ["Naranjas frescas", "Stevia", "Harina integral", "Aceite de coco"],
    historia: "Desarrollada para nuestros clientes que cuidan su salud sin renunciar al sabor.",
  },
  {
    codigo: "PSA002",
    categoria: "sin-azucar",
    nombre: "Cheesecake Sin Azúcar",
    precio: 47000,
    descripcion: "Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.",
    imagen: "img/cheesecake.jpg",
    icono: "fa-solid fa-leaf",
    cantidadPersonas: "6-8 personas",
    ingredientes: ["Queso crema", "Stevia", "Galletas integrales", "Frutas del bosque"],
    historia: "Una versión saludable del clásico americano, sin comprometer la textura cremosa.",
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
    cantidadPersonas: "1 persona",
    ingredientes: ["Manzanas", "Canela", "Masa hojaldre", "Azúcar morena"],
    historia: "Receta tradicional europea adaptada con manzanas locales de la región.",
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
    cantidadPersonas: "4-6 personas",
    ingredientes: ["Almendras", "Huevos", "Azúcar", "Limón"],
    historia: "Auténtica receta española del Camino de Santiago, con almendras tostadas artesanalmente.",
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
    cantidadPersonas: "2-3 personas",
    ingredientes: ["Harina de almendras", "Chocolate", "Huevos", "Mantequilla"],
    historia: "Desarrollado especialmente para celíacos, manteniendo toda la intensidad del chocolate.",
  },
  {
    codigo: "PG002",
    categoria: "sin-gluten",
    nombre: "Pan Sin Gluten",
    precio: 3500,
    descripcion: "Suave y esponjoso, ideal para sándwiches o para acompañar cualquier comida.",
    imagen: "img/pan-sin-gluten-esponjoso.jpg",
    icono: "fa-solid fa-wheat-awn-circle-exclamation",
    cantidadPersonas: "4-6 porciones",
    ingredientes: ["Harina de arroz", "Almidón de maíz", "Levadura", "Huevos"],
    historia: "Años de investigación nos llevaron a crear este pan con la textura perfecta.",
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
    cantidadPersonas: "8-10 personas",
    ingredientes: ["Chocolate vegano", "Leche de almendras", "Harina", "Aceite de coco"],
    historia: "Creada con amor por el planeta y los animales, sin comprometer el sabor auténtico.",
  },
  {
    codigo: "PV002",
    categoria: "vegana",
    nombre: "Galletas Veganas de Avena",
    precio: 4500,
    descripcion: "Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano.",
    imagen: "img/galletas-veganas-avena-crujientes.jpg",
    icono: "fa-solid fa-seedling",
    cantidadPersonas: "6-8 galletas",
    ingredientes: ["Avena", "Harina integral", "Aceite de coco", "Jarabe de arce"],
    historia: "Perfectas para acompañar tu té o café, elaboradas con ingredientes 100% naturales.",
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
    cantidadPersonas: "10-12 personas",
    ingredientes: ["Bizcocho a elección", "Crema personalizada", "Decoraciones comestibles"],
    historia: "Cada torta es única, diseñada especialmente para hacer inolvidable tu celebración.",
  },
  {
    codigo: "TE002",
    categoria: "especiales",
    nombre: "Torta Especial de Boda",
    precio: 60000,
    descripcion: "Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.",
    imagen: "img/torta-boda-especial.jpg",
    icono: "fa-solid fa-gift",
    cantidadPersonas: "15-20 personas",
    ingredientes: ["Bizcocho premium", "Fondant", "Flores comestibles", "Decoraciones personalizadas"],
    historia: "Creaciones únicas para el día más especial, con diseños exclusivos para cada pareja.",
  },
]
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

// Elementos del DOM
const productosGrid = document.getElementById("productos-grid")
const buscarInput = document.getElementById("buscar-producto")
const filtrosBtns = document.querySelectorAll(".filtro-btn")
const noProductos = document.getElementById("no-productos")
const modalOverlay = document.getElementById("modal-overlay")
const modalClose = document.getElementById("modal-close")
const modalBody = document.getElementById("modal-body")
const cartCount = document.querySelector(".cart-count")

// Funciones auxiliares
function obtenerNombreCategoria(categoria) {
  return categorias[categoria] || "Desconocida"
}

function formatearPrecio(precio) {
  return `$${precio.toLocaleString("es-CL")}`
}

// Inicializar la página
document.addEventListener("DOMContentLoaded", () => {
  productosActuales = [...productosData]
  mostrarProductos(productosActuales)
  actualizarContadorCarrito()
  configurarEventListeners()
})

// Configurar event listeners
function configurarEventListeners() {
  // Búsqueda
  if (buscarInput) {
    buscarInput.addEventListener("input", filtrarProductos)
  }

  filtrosBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remover clase active de todos los botones
      filtrosBtns.forEach((b) => b.classList.remove("active"))
      // Agregar clase active al botón clickeado
      this.classList.add("active")

      filtrarProductos()
    })
  })

  // Modal
  if (modalClose) {
    modalClose.addEventListener("click", cerrarModal)
  }
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        cerrarModal()
      }
    })
  }

  // Cerrar modal con ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      cerrarModal()
    }
  })
}

// Mostrar productos en el grid
function mostrarProductos(productos) {
  if (productos.length === 0) {
    productosGrid.style.display = "none"
    noProductos.style.display = "block"
    return
  }

  productosGrid.style.display = "grid"
  noProductos.style.display = "none"

  productosGrid.innerHTML = productos
    .map(
      (producto) => `
        <div class="producto-card" onclick="abrirModal('${producto.codigo}')">
            <div class="producto-imagen">
                <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
                <div class="categoria-badge">${obtenerNombreCategoria(producto.categoria)}</div>
            </div>
            <div class="producto-info">
                <h3 class="producto-nombre">${producto.nombre}</h3>
                <p class="producto-descripcion">${producto.descripcion}</p>
                <div class="producto-footer">
                    <span class="producto-precio">${formatearPrecio(producto.precio)}</span>
                    <button class="btn-agregar" onclick="event.stopPropagation(); agregarAlCarrito('${producto.codigo}')">
                        <i class="fa-solid fa-cart-plus"></i>
                        Agregar
                    </button>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

function filtrarProductos() {
  const textoBusqueda = buscarInput ? buscarInput.value.toLowerCase().trim() : ""
  const categoriaActiva = document.querySelector(".filtro-btn.active").dataset.categoria

  let productosFiltrados = [...productosData]

  // Filtrar por categoría
  if (categoriaActiva !== "todas") {
    productosFiltrados = productosFiltrados.filter((producto) => producto.categoria === categoriaActiva)
  }

  // Filtrar por texto de búsqueda
  if (textoBusqueda) {
    productosFiltrados = productosFiltrados.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(textoBusqueda) ||
        producto.descripcion.toLowerCase().includes(textoBusqueda) ||
        obtenerNombreCategoria(producto.categoria).toLowerCase().includes(textoBusqueda),
    )
  }

  productosActuales = productosFiltrados
  mostrarProductos(productosActuales)
}

// Abrir modal con detalles del producto
function abrirModal(codigoProducto) {
  const producto = productosData.find((p) => p.codigo === codigoProducto)
  if (!producto) return

  modalBody.innerHTML = `
        <div class="modal-producto">
            <div class="modal-imagen">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="categoria-badge">${obtenerNombreCategoria(producto.categoria)}</div>
            </div>
            <div class="modal-info">
                <h2 class="pacifico-regular" style="color: var(--color-acento-cafe); margin-bottom: 15px;">
                    ${producto.nombre}
                </h2>
                
                <div class="modal-detalles" style="margin-bottom: 20px;">
                    <div class="detalle-item">
                        <strong>Código:</strong> ${producto.codigo}
                    </div>
                    <div class="detalle-item">
                        <strong>Categoría:</strong> ${obtenerNombreCategoria(producto.categoria)}
                    </div>
                    <div class="detalle-item">
                        <strong>Cantidad de personas:</strong> ${producto.cantidadPersonas}
                    </div>
                </div>

                <div class="modal-descripcion" style="margin-bottom: 20px;">
                    <h4 style="color: var(--color-acento-cafe); margin-bottom: 10px;">Descripción</h4>
                    <p style="color: var(--color-letra-gris); line-height: 1.6;">
                        ${producto.descripcion}
                    </p>
                </div>

                <div class="modal-ingredientes" style="margin-bottom: 20px;">
                    <h4 style="color: var(--color-acento-cafe); margin-bottom: 10px;">Ingredientes</h4>
                    <div class="ingredientes-lista" style="display: flex; flex-wrap: wrap; gap: 8px;">
                        ${producto.ingredientes
                          .map(
                            (ingrediente) =>
                              `<span class="ingrediente-tag" style="background: var(--color-acento-rosa); color: white; padding: 4px 8px; border-radius: 15px; font-size: 0.85rem;">${ingrediente}</span>`,
                          )
                          .join("")}
                    </div>
                </div>

                <div class="modal-historia" style="margin-bottom: 25px;">
                    <h4 style="color: var(--color-acento-cafe); margin-bottom: 10px;">Historia</h4>
                    <p style="color: var(--color-letra-gris); line-height: 1.6; font-style: italic;">
                        ${producto.historia}
                    </p>
                </div>

                <div class="personalizacion-section" style="margin-bottom: 25px; padding: 15px; background: #f9f9f9; border-radius: 10px;">
                    <h4 style="color: var(--color-acento-cafe); margin-bottom: 10px;">Personalización</h4>
                    <label for="cantidad-personas" style="display: block; margin-bottom: 5px; font-weight: 600;">Ajustar cantidad de personas:</label>
                    <select id="cantidad-personas" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px; margin-bottom: 10px;">
                        <option value="estandar">Tamaño estándar (${producto.cantidadPersonas})</option>
                        <option value="pequeno">Tamaño pequeño (50% menos)</option>
                        <option value="grande">Tamaño grande (50% más)</option>
                        <option value="extra-grande">Tamaño extra grande (100% más)</option>
                    </select>
                    <label for="mensaje-especial" style="display: block; margin-bottom: 5px; font-weight: 600;">Mensaje especial (opcional):</label>
                    <input type="text" id="mensaje-especial" placeholder="Ej: Feliz Cumpleaños María" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
                </div>

                <div class="modal-footer" style="display: flex; justify-content: space-between; align-items: center; padding-top: 20px; border-top: 2px solid var(--color-acento-rosa);">
                    <span class="modal-precio" style="font-size: 2rem; font-weight: 700; color: var(--color-acento-cafe);">
                        ${formatearPrecio(producto.precio)}
                    </span>
                    <button class="btn-agregar" onclick="agregarAlCarritoPersonalizado('${producto.codigo}'); cerrarModal();" style="padding: 15px 30px; font-size: 1.1rem;">
                        <i class="fa-solid fa-cart-plus"></i>
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        </div>
    `

  modalOverlay.classList.add("active")
  document.body.style.overflow = "hidden"
}

// Cerrar modal
function cerrarModal() {
  modalOverlay.classList.remove("active")
  document.body.style.overflow = "auto"
}

// Agregar producto al carrito
function agregarAlCarrito(codigoProducto) {
  const producto = productosData.find((p) => p.codigo === codigoProducto)
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

function mostrarModalPersonalizacion(codigoProducto) {
  const producto = productosData.find((p) => p.codigo === codigoProducto)
  if (!producto) return

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

function agregarProductoDirecto(codigoProducto) {
  const producto = productosData.find((p) => p.codigo === codigoProducto)
  if (!producto) return

  const itemExistente = carrito.find(
    (item) => item.codigo === codigoProducto && !item.cantidadPersonas && !item.mensajeEspecial && !item.colorGlaseado,
  )

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
  mostrarNotificacion(`${producto.nombre} agregado al carrito`)
}

function abrirFormularioPersonalizacion(codigoProducto) {
  cerrarModalConfirmacion()
  const producto = productosData.find((p) => p.codigo === codigoProducto)
  if (!producto) return

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

function cerrarModalPersonalizacion() {
  const modal = document.querySelector(".modal-personalizacion-overlay")
  if (modal) {
    document.body.removeChild(modal)
    document.body.style.overflow = "auto"
  }
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
  const producto = productosData.find((p) => p.codigo === codigoProducto)
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

// Actualizar contador del carrito
function actualizarContadorCarrito() {
  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0)
  cartCount.textContent = totalItems
  cartCount.style.display = totalItems > 0 ? "flex" : "none"
}

// Mostrar notificación
function mostrarNotificacion(mensaje) {
  // Crear elemento de notificación
  const notificacion = document.createElement("div")
  notificacion.className = "notificacion"
  notificacion.innerHTML = `
        <i class="fa-solid fa-check-circle"></i>
        <span>${mensaje}</span>
    `

  // Estilos de la notificación
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

  // Animar entrada
  setTimeout(() => {
    notificacion.style.transform = "translateX(0)"
  }, 100)

  // Remover después de 3 segundos
  setTimeout(() => {
    notificacion.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notificacion)
    }, 300)
  }, 3000)
}

// Función para limpiar filtros (útil para debugging)
function limpiarFiltros() {
  if (buscarInput) {
    buscarInput.value = ""
  }
  document.querySelector('.filtro-btn[data-categoria="todas"]').click()
}
