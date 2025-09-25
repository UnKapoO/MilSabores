// Este código es para el archivo js/detalle-producto.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtiene el ID del producto desde la URL
    const params = new URLSearchParams(window.location.search);
    const codigoProducto = params.get('codigo');

    // 2. Busca el producto en el array 'productosData' que está en bd-productos.js
    const producto = productosData.find(p => p.codigo === codigoProducto);

    // 3. Si encuentra el producto, actualiza el HTML
    if (producto) {
        // Actualiza el texto
        document.getElementById('nombre-producto').textContent = producto.nombre;
        document.getElementById('precio-producto').textContent = formatearPrecio(producto.precio);
        document.getElementById('descripcion-producto').textContent = producto.descripcion;
        document.getElementById('codigo-producto').textContent = producto.codigo;
        document.getElementById('categoria-producto').textContent = obtenerNombreCategoria(producto.categoria);
        
        // Actualiza la imagen
        const imagenElemento = document.getElementById('imagen-producto');
        imagenElemento.src = producto.imagen;
        imagenElemento.alt = `Imagen de ${producto.nombre}`;

        // (Opcional) Agrega una historia o un texto de relleno
        document.getElementById('historia-producto').textContent = 
            `Nuestra ${producto.nombre} es un clásico de Mil Sabores. Cada bocado está lleno de tradición y pasión, preparado con los ingredientes más frescos. ¡Es un deleite que no te puedes perder!`;

        // (Opcional) Actualiza el breadcrumb
        document.getElementById('breadcrumb-producto').textContent = producto.nombre;

    } else {
        // Si el producto no se encuentra, muestra un mensaje de error
        const mainContainer = document.querySelector('.detalle-producto-main');
        mainContainer.innerHTML = `
            <div class="container text-center py-5">
                <h1 class="display-4">Producto no encontrado</h1>
                <p class="lead">Lo sentimos, el producto que buscas no existe.</p>
                <a href="catalogo.html" class="btn btn-primary mt-3">Volver al Catálogo</a>
            </div>
        `;
    }
});