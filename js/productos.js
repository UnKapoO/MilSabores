document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ESTRUCTURA DE DATOS ---
    const productosData = [
        { codigo: "TC001", categoria: "tortas-cuadradas", nombre: "Torta Cuadrada de Chocolate", precio: 45000, descripcion: "Deliciosa torta de chocolate con capas de ganache...", imagen: "img/torta-cuadrada-chocolate-ganache.jpg" },
        { codigo: "TC002", categoria: "tortas-cuadradas", nombre: "Torta Cuadrada de Frutas", precio: 50000, descripcion: "Una mezcla de frutas frescas y crema chantilly...", imagen: "img/torta-cuadrada-frutas-crema-chantilly.jpg" },
        { codigo: "TT001", categoria: "tortas-circulares", nombre: "Torta Circular de Vainilla", precio: 40000, descripcion: "Bizcocho de vainilla clásico relleno con crema pastelera...", imagen: "img/torta-circular-vainilla.jpg" },
        // ... (resto de tus productos)
    ];
    const categorias = { "tortas-cuadradas": "Tortas Cuadradas", "tortas-circulares": "Tortas Circulares", "postres-individuales": "Postres Individuales" };

    // --- 2. SELECCIÓN DE ELEMENTOS DEL DOM ---
    const productListBody = document.getElementById('product-list-body');
    const categoryFilter = document.getElementById('category-filter');
    const modal = document.getElementById('product-modal');
    const closeModalBtn = document.getElementById('close-modal');
    
    // CORRECCIÓN 1: Añadimos la selección del input de búsqueda
    const searchInput = document.getElementById('search-input'); 

    // Selectores para el contenido del modal
    const modalProductName = document.getElementById('modal-product-name');
    const modalProductCategory = document.getElementById('modal-product-category');
    const modalProductDescription = document.getElementById('modal-product-description');
    const modalProductImage = document.getElementById('modal-product-image');
    const modalProductPrice = document.getElementById('modal-product-price');
    const modalProductCode = document.getElementById('modal-product-code');

    // --- 3. FUNCIONES ---

    function renderProducts(products) {
        if (!productListBody) return;
        productListBody.innerHTML = '';
        products.forEach(product => {
            const row = document.createElement('tr');
            const formattedPrice = product.precio.toLocaleString('es-CL');
            const categoriaNombre = categorias[product.categoria] || product.categoria;
            row.innerHTML = `<td data-label="Imagen"><div class="product-info"><img src="${product.imagen}" alt="${product.nombre}" class="product-image"></div></td><td data-label="Producto">${product.nombre}</td><td data-label="Categoría">${categoriaNombre}</td><td data-label="Precio">$${formattedPrice}</td><td data-label="Acciones"><div class="action-buttons"><button class="action-btn btn-view" data-codigo="${product.codigo}"><i class="fa-solid fa-eye"></i></button><button class="action-btn btn-edit" data-codigo="${product.codigo}"><i class="fa-solid fa-pencil"></i></button><button class="action-btn btn-delete" data-codigo="${product.codigo}"><i class="fa-solid fa-trash"></i></button></div></td>`;
            productListBody.appendChild(row);
        });
    }

    function populateCategoryFilter() {
        if (!categoryFilter) return;
        categoryFilter.innerHTML = '<option value="todos">Todas las categorías</option>';
        for (const key in categorias) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = categorias[key];
            categoryFilter.appendChild(option);
        }
    }

    // CORRECCIÓN 2: Eliminamos la función 'handleFilterChange' que ya no se usa

    function openModal(productCode) {
        const product = productosData.find(p => p.codigo === productCode);
        if (!product || !modal) return;
        modalProductName.textContent = product.nombre;
        modalProductCategory.textContent = categorias[product.categoria] || product.categoria;
        modalProductDescription.textContent = product.descripcion;
        modalProductImage.src = product.imagen;
        modalProductPrice.textContent = `$${product.precio.toLocaleString('es-CL')}`;
        modalProductCode.textContent = `Código: ${product.codigo}`;
        modal.classList.remove('is-hidden');
    }

    function closeModal() {
        if (modal) {
            modal.classList.add('is-hidden');
        }
    }
    
    function applyFilters() {
        const category = categoryFilter.value;
        const searchTerm = searchInput.value.toLowerCase().trim();
        let filteredProducts = productosData;

        if (category !== 'todos') {
            filteredProducts = filteredProducts.filter(product => product.categoria === category);
        }

        if (searchTerm) {
            filteredProducts = filteredProducts.filter(product =>
                product.nombre.toLowerCase().includes(searchTerm)
            );
        }
        renderProducts(filteredProducts);
    }

    // --- 4. LÓGICA DE EVENTOS ---

    if (productListBody) {
        productListBody.addEventListener('click', (event) => {
            const viewButton = event.target.closest('.btn-view');
            if (viewButton) {
                const productCode = viewButton.dataset.codigo;
                openModal(productCode);
            }
        });
    }

    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
    
    // Ahora este 'if' funcionará porque 'searchInput' está definido
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    // --- 5. EJECUCIÓN INICIAL ---
    populateCategoryFilter();
    renderProducts(productosData);
});