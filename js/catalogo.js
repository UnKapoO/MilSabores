// Variables globales
let productosActuales = []
const carrito = JSON.parse(localStorage.getItem("carrito")) || []

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
    imagen: "img/torta-circular-vainilla-glaseado.jpg",
    icono: "fa-solid fa-birthday-cake",
  },
  {
    codigo: "TT002",
    categoria: "tortas-circulares",
    nombre: "Torta Circular de Manjar",
    precio: 42000,
    descripcion:
      "Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.",
    imagen: "img/torta-circular-manjar-nueces-chilena.jpg",
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
    imagen: "img/empanadas-manzana",
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
const categorias = {
  // Aquí deberías incluir los nombres de las categorías
  // Por ejemplo:
  // 'categoria1': 'Nombre de la Categoría 1',
  // 'categoria2': 'Nombre de la Categoría 2',
  // ...
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
  buscarInput.addEventListener("input", filtrarProductos)

  // Filtros de categoría
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
  modalClose.addEventListener("click", cerrarModal)
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      cerrarModal()
    }
  })

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

// Filtrar productos
function filtrarProductos() {
  const textoBusqueda = buscarInput.value.toLowerCase().trim()
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
                <p class="modal-descripcion" style="color: var(--color-letra-gris); line-height: 1.6; margin-bottom: 20px;">
                    ${producto.descripcion}
                </p>
                <div class="modal-detalles" style="margin-bottom: 25px;">
                    <p><strong>Código:</strong> ${producto.codigo}</p>
                    <p><strong>Categoría:</strong> ${obtenerNombreCategoria(producto.categoria)}</p>
                </div>
                <div class="modal-footer" style="display: flex; justify-content: space-between; align-items: center; padding-top: 20px; border-top: 2px solid var(--color-acento-rosa);">
                    <span class="modal-precio" style="font-size: 2rem; font-weight: 700; color: var(--color-acento-cafe);">
                        ${formatearPrecio(producto.precio)}
                    </span>
                    <button class="btn-agregar" onclick="agregarAlCarrito('${producto.codigo}'); cerrarModal();" style="padding: 15px 30px; font-size: 1.1rem;">
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

  const itemExistente = carrito.find((item) => item.codigo === codigoProducto)

  if (itemExistente) {
    itemExistente.cantidad += 1
  } else {
    carrito.push({
      ...producto,
      cantidad: 1,
    })
  }

  // Guardar en localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito))

  // Actualizar contador
  actualizarContadorCarrito()

  // Mostrar notificación
  mostrarNotificacion(`${producto.nombre} agregado al carrito`)
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
  buscarInput.value = ""
  document.querySelector('.filtro-btn[data-categoria="todas"]').click()
}


//Funcion para mostrar productos aleatoriamente en la sección "Tambien te puede interesar..."

function obtenerRecomendados(lista, cantidad = 6) {
  //Mezcla el arreglo y toma los primeros N valores
  return lista.sort(() => Math.random() - 0.5).slice(0, cantidad);

}

const recomendados = obtenerRecomendados(productosData, 6);

const contenedor = document.getElementById("recomendados");


recomendados.forEach(prod => {
  contenedor.innerHTML += `
        <div class="col-6 col-md-4 mb-4">
            <div class="card h-100">
                <img src="${prod.imagen}" class="card-img-top img-recomendado" alt="${prod.nombre}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${prod.nombre}</h5>
                    <p class="fw-bold fs-5">$${prod.precio.toLocaleString("es-CL")}</p>
                    <a href="detalle.html?codigo=${prod.codigo}" class="btn btn-ver-detalles mt-auto">Ver detalles</a>
                </div>
            </div>
        </div>
    `;
});
