document.addEventListener("DOMContentLoaded", () => {
    // --- Tus Datos de Productos ---
    const productosData = [
        {
            codigo: "TC001",
            categoria: "tortas-cuadradas",
            nombre: "Torta Cuadrada de Chocolate",
            precio: 45000,
            descripcion: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.",
            imagen: "img/torta-cuadrada-chocolate-ganache.jpg",
            icono: "fa-solid fa-birthday-cake",
        },
        {
            codigo: "TC002",
            categoria: "tortas-cuadradas",
            nombre: "Torta Cuadrada de Frutas",
            precio: 50000,
            descripcion: "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.",
            imagen: "img/torta-cuadrada-frutas-crema-chantilly.jpg",
            icono: "fa-solid fa-birthday-cake",
        },
        {
            codigo: "TT001",
            categoria: "tortas-circulares",
            nombre: "Torta Circular de Vainilla",
            precio: 40000,
            descripcion: "Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.",
            imagen: "img/torta-circular-vainilla.jpg",
            icono: "fa-solid fa-birthday-cake",
        },
        {
            codigo: "TT002",
            categoria: "tortas-circulares",
            nombre: "Torta Circular de Manjar",
            precio: 42000,
            descripcion: "Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.",
            imagen: "img/torta-circular-manjar.jpg",
            icono: "fa-solid fa-birthday-cake",
        },
        {
            codigo: "PI001",
            categoria: "postres-individuales",
            nombre: "Mousse de Chocolate",
            precio: 5000,
            descripcion: "Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate.",
            imagen: "img/mousse-chocolate-cremoso-individual.jpg",
            icono: "fa-solid fa-ice-cream",
        },
        {
            codigo: "PI002",
            categoria: "postres-individuales",
            nombre: "Tiramisú Clásico",
            precio: 5500,
            descripcion: "Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.",
            imagen: "img/tiramisu-italiano-cafe-mascarpone.jpg",
            icono: "fa-solid fa-ice-cream",
        },
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
            descripcion: "Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos.",
            imagen: "img/tarta-santiago-almendras-espa-ola.jpg",
            icono: "fa-solid fa-bread-slice",
        },
        {
            codigo: "PG001",
            categoria: "sin-gluten",
            nombre: "Brownie Sin Gluten",
            precio: 4000,
            descripcion: "Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor.",
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
    ];

    // --- Lógica para mostrar los productos más vendidos ---

    // 1. Simulamos un número de ventas para cada producto
    const productosConVentas = productosData.map(producto => {
        return {
            ...producto, // Copiamos todas las propiedades del producto original
            vendidos: Math.floor(Math.random() * 150) + 10 // Añadimos un número de ventas aleatorio (entre 10 y 160)
        };
    });

    // 2. Ordenamos los productos de mayor a menor número de ventas
    productosConVentas.sort((a, b) => b.vendidos - a.vendidos);

    // 3. Tomamos los 3 productos más vendidos
    const top3Productos = productosConVentas.slice(0, 3);

    // 4. Seleccionamos el contenedor en el HTML
    const topProductsList = document.getElementById('top-products-list');
    
    // Limpiamos la lista por si tenía contenido estático
    topProductsList.innerHTML = ''; 

    // 5. Creamos y añadimos el HTML para cada producto del top 3
    top3Productos.forEach(producto => {
        const productoElemento = document.createElement('li');
        productoElemento.innerHTML = `
            <div class="product-info">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div>
                    <span class="product-name">${producto.nombre}</span>
                    <span class="product-sales">${producto.vendidos} vendidos</span>
                </div>
            </div>
        `;
        topProductsList.appendChild(productoElemento);
    });

    // --- Lógica para el menú móvil (la dejamos para que siga funcionando) ---
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('overlay');

    if (menuToggle) {
        function toggleMenu() {
            sidebar.classList.toggle('is-visible');
            overlay.classList.toggle('is-visible');
        }
        menuToggle.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
    }
});