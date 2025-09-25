// Datos de los artículos del blog
const articulosData = [
    {
        id: 1,
        categoria: "recetas",
        titulo: "Secretos para el Bizcocho Perfecto",
        resumen: "Descubre los trucos profesionales para lograr un bizcocho esponjoso y delicioso en casa.",
        fecha: "2024-01-15",
        autor: "Chef María González",
        imagen: "img/blog-bizcocho-perfecto.jpg",
        contenido: `
      <h4>Los Fundamentos del Bizcocho Perfecto</h4>
      <p>Un bizcocho perfecto es la base de cualquier torta exitosa. Después de 20 años en la pastelería, he aprendido que la clave está en los detalles.</p>
      
      <h4>Ingredientes Esenciales</h4>
      <ul>
        <li>Huevos a temperatura ambiente</li>
        <li>Mantequilla de calidad, sin sal</li>
        <li>Harina tamizada dos veces</li>
        <li>Azúcar refinada</li>
        <li>Polvo de hornear fresco</li>
      </ul>
      
      <h4>Técnica de Mezclado</h4>
      <p>El secreto está en el orden: primero crema la mantequilla con el azúcar hasta que esté pálida y esponjosa. Luego incorpora los huevos uno a uno, y finalmente alterna entre los ingredientes secos y líquidos.</p>
      
      <p>La temperatura del horno es crucial: 180°C es ideal para la mayoría de bizcochos. Y recuerda, ¡nunca abras el horno durante los primeros 20 minutos!</p>
    `,
    },
    {
        id: 2,
        categoria: "noticias",
        titulo: "Nueva Sucursal en Concepción Centro",
        resumen: "Estamos emocionados de anunciar la apertura de nuestra nueva sucursal en el corazón de Concepción.",
        fecha: "2024-01-10",
        autor: "Equipo Mil Sabores",
        imagen: "img/blog-nueva-sucursal.jpg",
        contenido: `
      <h4>¡Gran Apertura!</h4>
      <p>Después de meses de preparación, finalmente abrimos nuestras puertas en Concepción Centro. Esta nueva ubicación nos permite estar más cerca de nuestros clientes del centro de la ciudad.</p>
      
      <h4>Qué Encontrarás</h4>
      <ul>
        <li>Toda nuestra línea de productos frescos diariamente</li>
        <li>Servicio de café y té premium</li>
        <li>Área de degustación</li>
        <li>Servicio de pedidos personalizados</li>
      </ul>
      
      <h4>Horarios de Atención</h4>
      <p>Lunes a Viernes: 8:00 AM - 8:00 PM</p>
      <p>Sábados y Domingos: 9:00 AM - 9:00 PM</p>
      
      <p>¡Te esperamos para celebrar juntos esta nueva etapa!</p>
    `,
    },
    {
        id: 3,
        categoria: "consejos",
        titulo: "Cómo Conservar Tortas Frescas por Más Tiempo",
        resumen: "Tips profesionales para mantener tus tortas frescas y deliciosas durante más días.",
        fecha: "2024-01-08",
        autor: "Chef Carlos Mendoza",
        imagen: "img/blog-conservar-tortas.jpg",
        contenido: `
      <h4>La Importancia del Almacenamiento</h4>
      <p>Una torta bien conservada puede mantener su frescura y sabor por varios días. La clave está en controlar la humedad y la temperatura.</p>
      
      <h4>Métodos de Conservación</h4>
      <ul>
        <li><strong>Refrigeración:</strong> Ideal para tortas con crema o rellenos perecederos</li>
        <li><strong>Temperatura ambiente:</strong> Perfecta para bizcochos simples y tortas secas</li>
        <li><strong>Congelación:</strong> Para conservación a largo plazo</li>
      </ul>
      
      <h4>Consejos Profesionales</h4>
      <p>Siempre envuelve la torta en film plástico o guárdala en un recipiente hermético. Si tiene decoraciones delicadas, usa palillos para evitar que el envoltorio las toque.</p>
      
      <p>Para tortas con fondant, evita la refrigeración ya que puede causar condensación y arruinar la decoración.</p>
    `,
    },
    {
        id: 4,
        categoria: "eventos",
        titulo: "Taller de Repostería para Principiantes",
        resumen: "Únete a nuestro taller mensual donde aprenderás las técnicas básicas de la repostería.",
        fecha: "2024-01-05",
        autor: "Equipo Mil Sabores",
        imagen: "img/blog-taller-reposteria.jpg",
        contenido: `
      <h4>¡Aprende con los Expertos!</h4>
      <p>Cada último sábado del mes realizamos talleres de repostería para principiantes. Es una oportunidad única de aprender directamente de nuestros chefs profesionales.</p>
      
      <h4>Qué Aprenderás</h4>
      <ul>
        <li>Técnicas básicas de mezclado</li>
        <li>Preparación de cremas y rellenos</li>
        <li>Decoración básica con manga pastelera</li>
        <li>Secretos para hornear perfecto</li>
      </ul>
      
      <h4>Incluye</h4>
      <p>Todos los ingredientes y herramientas necesarias, recetario digital, y por supuesto, ¡te llevas a casa todo lo que prepares!</p>
      
      <h4>Inscripciones</h4>
      <p>Cupos limitados a 12 personas. Reserva tu lugar llamando al +56 9 99999999 o visitando cualquiera de nuestras sucursales.</p>
      
      <p>Próximo taller: 27 de Enero, 10:00 AM - 2:00 PM</p>
    `,
    },
    {
        id: 5,
        categoria: "recetas",
        titulo: "Ganache de Chocolate: La Receta Definitiva",
        resumen: "Aprende a preparar el ganache de chocolate perfecto para tus tortas y postres.",
        fecha: "2024-01-03",
        autor: "Chef Ana Rodríguez",
        imagen: "img/blog-ganache-chocolate.jpg",
        contenido: `
      <h4>El Arte del Ganache</h4>
      <p>El ganache es una de las preparaciones más versátiles en pastelería. Puede usarse como relleno, cobertura o incluso para hacer trufas.</p>
      
      <h4>Ingredientes (Proporción 1:1)</h4>
      <ul>
        <li>200g de chocolate negro (70% cacao)</li>
        <li>200ml de crema de leche (35% grasa)</li>
        <li>1 cucharada de mantequilla (opcional)</li>
      </ul>
      
      <h4>Preparación Paso a Paso</h4>
      <p>1. Pica el chocolate finamente y colócalo en un bowl.</p>
      <p>2. Calienta la crema hasta que esté a punto de hervir.</p>
      <p>3. Vierte la crema caliente sobre el chocolate y deja reposar 2 minutos.</p>
      <p>4. Mezcla desde el centro hacia afuera hasta obtener una mezcla homogénea.</p>
      <p>5. Agrega la mantequilla para dar brillo extra.</p>
      
      <h4>Consejos de Experto</h4>
      <p>Para un ganache más firme (ideal para coberturas), usa proporción 2:1 (chocolate:crema). Para un ganache más líquido (ideal para rellenos), usa proporción 1:2.</p>
    `,
    },
    {
        id: 6,
        categoria: "noticias",
        titulo: "Nuevos Sabores de Temporada",
        resumen: "Descubre nuestros nuevos sabores inspirados en los frutos de la temporada de verano.",
        fecha: "2024-01-01",
        autor: "Equipo Mil Sabores",
        imagen: "img/blog-sabores-temporada.jpg",
        contenido: `
      <h4>Sabores que Celebran el Verano</h4>
      <p>Con la llegada del verano, hemos creado una línea especial de productos que capturan la esencia de la temporada.</p>
      
      <h4>Nuevos Productos</h4>
      <ul>
        <li><strong>Torta de Frutillas y Crema:</strong> Con frutillas frescas de la región</li>
        <li><strong>Mousse de Mango:</strong> Tropical y refrescante</li>
        <li><strong>Cheesecake de Frambuesas:</strong> El equilibrio perfecto entre dulce y ácido</li>
        <li><strong>Helado Artesanal de Chirimoya:</strong> Un sabor único y chileno</li>
      </ul>
      
      <h4>Disponibilidad</h4>
      <p>Estos sabores especiales estarán disponibles solo durante los meses de verano (Diciembre a Marzo). ¡No te los pierdas!</p>
      
      <p>Visita nuestras sucursales o haz tu pedido online para disfrutar de estos sabores únicos de temporada.</p>
    `,
    },
]

// Variables globales
let articulosActuales = []
const carrito = JSON.parse(localStorage.getItem("carrito")) || []

// Elementos del DOM
const articulosGrid = document.getElementById("articulos-grid")
const filtrosBtns = document.querySelectorAll(".filtro-blog-btn")
const noArticulos = document.getElementById("no-articulos")
const modalOverlay = document.getElementById("modal-overlay")
const modalClose = document.getElementById("modal-close")
const modalBody = document.getElementById("modal-body")
const newsletterForm = document.getElementById("newsletter-form")
const cartCount = document.querySelector(".cart-count")

// Funciones auxiliares
function formatearFecha(fecha) {
    const opciones = { year: "numeric", month: "long", day: "numeric" }
    return new Date(fecha).toLocaleDateString("es-CL", opciones)
}

function obtenerNombreCategoria(categoria) {
    const categorias = {
        recetas: "Recetas",
        noticias: "Noticias",
        consejos: "Consejos",
        eventos: "Eventos",
    }
    return categorias[categoria] || "General"
}

// Inicializar la página
document.addEventListener("DOMContentLoaded", () => {
    articulosActuales = [...articulosData]
    mostrarArticulos(articulosActuales)
    actualizarContadorCarrito()
    configurarEventListeners()
})

// Configurar event listeners
function configurarEventListeners() {
    // Filtros
    filtrosBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            // Remover clase active de todos los botones
            filtrosBtns.forEach((b) => b.classList.remove("active"))
            // Agregar clase active al botón clickeado
            this.classList.add("active")

            filtrarArticulos()
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

    // Newsletter
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", manejarSuscripcion)
    }
}

// Mostrar artículos en el grid
function mostrarArticulos(articulos) {
    if (articulos.length === 0) {
        articulosGrid.style.display = "none"
        noArticulos.style.display = "block"
        return
    }

    articulosGrid.style.display = "grid"
    noArticulos.style.display = "none"

    articulosGrid.innerHTML = articulos
        .map(
            (articulo) => `
        <div class="articulo-card" onclick="abrirArticulo(${articulo.id})">
            <div class="articulo-imagen">
                <img src="${articulo.imagen}" alt="${articulo.titulo}" loading="lazy">
                <div class="categoria-badge">${obtenerNombreCategoria(articulo.categoria)}</div>
            </div>
            <div class="articulo-info">
                <div class="articulo-fecha">
                    <i class="fa-solid fa-calendar"></i>
                    ${formatearFecha(articulo.fecha)}
                </div>
                <h3 class="articulo-titulo">${articulo.titulo}</h3>
                <p class="articulo-resumen">${articulo.resumen}</p>
                <div class="articulo-footer">
                    <div class="articulo-autor">
                        <i class="fa-solid fa-user"></i>
                        ${articulo.autor}
                    </div>
                    <button class="btn-leer-mas" onclick="event.stopPropagation(); abrirArticulo(${articulo.id})">
                        Leer más
                    </button>
                </div>
            </div>
        </div>
    `,
        )
        .join("")
}

// Filtrar artículos
function filtrarArticulos() {
    const categoriaActiva = document.querySelector(".filtro-blog-btn.active").dataset.categoria

    let articulosFiltrados = [...articulosData]

    // Filtrar por categoría
    if (categoriaActiva !== "todas") {
        articulosFiltrados = articulosFiltrados.filter((articulo) => articulo.categoria === categoriaActiva)
    }

    articulosActuales = articulosFiltrados
    mostrarArticulos(articulosActuales)
}

// Abrir artículo en modal
function abrirArticulo(idArticulo) {
    const articulo = articulosData.find((a) => a.id === idArticulo)
    if (!articulo) return

    modalBody.innerHTML = `
        <div class="modal-articulo">
            <img src="${articulo.imagen}" alt="${articulo.titulo}" class="modal-articulo-imagen">
            <h2 class="modal-articulo-titulo pacifico-regular">${articulo.titulo}</h2>
            <div class="modal-articulo-meta">
                <span><i class="fa-solid fa-calendar"></i> ${formatearFecha(articulo.fecha)}</span>
                <span><i class="fa-solid fa-user"></i> ${articulo.autor}</span>
                <span><i class="fa-solid fa-tag"></i> ${obtenerNombreCategoria(articulo.categoria)}</span>
            </div>
            <div class="modal-articulo-contenido">
                ${articulo.contenido}
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

// Actualizar contador del carrito
function actualizarContadorCarrito() {
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0)
    if (cartCount) {
        cartCount.textContent = totalItems
        cartCount.style.display = totalItems > 0 ? "flex" : "none"
    }
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
