// Asegúrate de que `productosData` se haya cargado desde el otro archivo
const productos = productosData;

// ---

// 1. Función para renderizar el producto en el HTML
function mostrarProducto(producto) {
    if (!producto) return;

    document.getElementById("nombre-producto").textContent = producto.nombre;
    document.getElementById("precio-producto").textContent = `$${producto.precio.toLocaleString("es-CL")}`;
    document.getElementById("descripcion-producto").textContent = producto.descripcion;
    document.getElementById("historia-producto").textContent = producto.historia || "Sin historia";
    const img = document.querySelector(".img-detalle-producto");
    img.src = producto.imagen;
    img.alt = producto.nombre;
}

// ---

// 2. Función para obtener productos aleatorios para "También te puede interesar"
// Ahora recibe el producto actual como argumento para poder filtrar correctamente.
function obtenerRecomendados(lista, productoActual, cantidad = 6) {
    // Si no hay producto actual, no filtres nada.
    const listaFiltrada = productoActual ? lista.filter(p => p.codigo !== productoActual.codigo) : lista;
    return listaFiltrada.sort(() => Math.random() - 0.5).slice(0, cantidad);
}

// ---

// 3. Lógica para cargar el producto al inicio o cuando el hash cambia
function cargarProducto() {
    const codigoProducto = window.location.hash.substring(1);
    const productoSeleccionado = productos.find(p => p.codigo === codigoProducto) || productos[0];

    // Ahora pasamos el producto seleccionado a la función de renderizado y a la de los recomendados
    mostrarProducto(productoSeleccionado);
    renderizarRecomendados(productoSeleccionado);

    // --- CAMBIO AQUÍ ---
    // Desplaza la ventana al principio de la página
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Desplazamiento suave
    });
}

// ---

// 4. Renderizar los productos recomendados en el HTML de forma optimizada
// Creamos una función para que sea más fácil de llamar.
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
                        <p class="fw-bold fs-5">$${prod.precio.toLocaleString("es-CL")}</p>
                        <a href="#${prod.codigo}" class="btn btn-ver-detalles mt-auto">Ver detalles</a>
                    </div>
                </div>
            </div>
        `;
    });
    contenedorRecomendados.innerHTML = htmlRecomendados;
}

// ---

// Escuchar cambios en el hash de la URL
window.addEventListener('hashchange', cargarProducto);

// Cargar el producto inicial al cargar la página
cargarProducto();