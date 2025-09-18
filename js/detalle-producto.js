const productos = productosData;

// 1. Función para renderizar el producto en el HTML
function mostrarProducto(producto) {
    if (!producto) return;

    document.getElementById("nombre-producto").textContent = producto.nombre;
    document.getElementById("precio-producto").textContent = `$${producto.precio.toLocaleString("es-CL")}`;
    document.getElementById("descripcion-producto").textContent = producto.descripcion;
    document.getElementById("codigo-producto").textContent= producto.codigo;
    document.getElementById("categoria-producto").textContent= producto.categoria;
    document.getElementById("historia-producto").textContent = producto.historia || "Sin historia";
    const img = document.querySelector(".img-detalle-producto");
    img.src = producto.imagen;
    img.alt = producto.nombre;
}

// 2. Función para obtener productos aleatorios para "También te puede interesar"
function obtenerRecomendados(lista, productoActual, cantidad = 6) {
    const listaFiltrada = productoActual ? lista.filter(p => p.codigo !== productoActual.codigo) : lista;
    return listaFiltrada.sort(() => Math.random() - 0.5).slice(0, cantidad);
}

// 3. Renderizar los productos recomendados
function renderizarRecomendados(productoActual) {
    const contenedorRecomendados = document.getElementById("recomendados");
    const recomendados = obtenerRecomendados(productos, productoActual, 6);
    let htmlRecomendados = '';

    recomendados.forEach(prod => {
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
        `;
    });
    contenedorRecomendados.innerHTML = htmlRecomendados;
}

// 4. Lógica principal para cargar el producto
function cargarProducto() {
    // Intenta obtener el código del parámetro de la URL (si vienes del catálogo)
    const params = new URLSearchParams(window.location.search);
    let codigoProducto = params.get("codigo");

    // Si no hay parámetro, intenta obtenerlo del hash (si la navegación es interna)
    if (!codigoProducto) {
        codigoProducto = window.location.hash.substring(1);
    }
    
    // Busca el producto, o usa el primero si no se encuentra ninguno
    const productoSeleccionado = productos.find(p => p.codigo === codigoProducto) || productos[0];

    // Llama a las funciones para mostrar y renderizar los productos
    mostrarProducto(productoSeleccionado);
    renderizarRecomendados(productoSeleccionado);

    // Desplaza la ventana al principio de la página
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---

// Event listener para manejar los clics y la carga inicial
document.addEventListener("DOMContentLoaded", cargarProducto);

// Event listener para manejar la navegación con el botón de retroceso
window.addEventListener('popstate', cargarProducto);