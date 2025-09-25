document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SELECCIÓN DE ELEMENTOS DEL DOM ---
    const pageTitle = document.querySelector('.admin-header h1');
    const pageDescription = document.querySelector('.admin-header p');
    const productForm = document.querySelector('form');
    
    // Campos del formulario
    const idInput = document.getElementById('id-producto');
    const nombreInput = document.getElementById('nombre-producto');
    const descripcionInput = document.getElementById('descrip-producto');
    const precioInput = document.getElementById('precio');
    const descuentoInput = document.getElementById('descuento');
    const stockInput = document.getElementById('stock');
    const estadoSelect = document.getElementById('estado');

    // Previsualización de Imagen
    const imageInput = document.getElementById('img-producto');
    const imagePreview = document.getElementById('image-preview');

    // Categorías y su Modal
    const categoriaSelect = document.getElementById('categoria');
    const modalElement = document.getElementById('modalCategoria');
    const guardarCategoriaBtn = document.getElementById('guardarCategoria');
    const nuevaCategoriaInput = document.getElementById('idnuevaCategoria');
    const modal = modalElement ? new bootstrap.Modal(modalElement) : null;

    // Opciones de Torta (Tamaños dinámicos)
    const opcionesTortaDiv = document.getElementById('opciones-torta');
    const addSizeBtn = document.getElementById('add-size-btn');
    const sizesContainer = document.getElementById('torta-sizes-container');

    // --- 2. DATOS INICIALES ---
    const categorias = {
        "tortas-cuadradas": "Tortas Cuadradas",
        "tortas-circulares": "Tortas Circulares",
        "postres-individuales": "Postres Individuales",
    };

    // --- 3. LÓGICA DE INICIALIZACIÓN (MODO EDICIÓN) ---
    const urlParams = new URLSearchParams(window.location.search);
    const isEditMode = urlParams.get('edit') === 'true';

    // Rellenamos el selector de categorías primero
    populateCategorySelector();

    // Si la URL indica modo edición, configuramos la página
    if (isEditMode) {
        setupEditMode();
    }

    // --- 4. DEFINICIÓN DE FUNCIONES ---

    function populateCategorySelector() {
        if (!categoriaSelect) return;
        categoriaSelect.innerHTML = '<option selected disabled value="">Seleccione una categoría</option>';
        for (const key in categorias) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = categorias[key];
            categoriaSelect.appendChild(option);
        }
        const nuevaOpt = document.createElement('option');
        nuevaOpt.value = 'nueva';
        nuevaOpt.textContent = '+ Nueva Categoría';
        categoriaSelect.appendChild(nuevaOpt);
    }

    function setupEditMode() {
        if (pageTitle) pageTitle.textContent = 'Editar Producto';
        if (pageDescription) pageDescription.textContent = 'Modifica la información del producto existente.';
        
        const productData = JSON.parse(localStorage.getItem('productToEdit'));
        if (productData) {
            populateForm(productData);
        }
    }

    function populateForm(product) {
        idInput.value = product.codigo;
        idInput.readOnly = true;
        nombreInput.value = product.nombre;
        descripcionInput.value = product.descripcion;
        precioInput.value = product.precioBase || product.precio;
        descuentoInput.value = product.descuento || '';
        stockInput.value = product.stock;
        estadoSelect.value = product.estado;
        
        if (imagePreview && product.imagen) {
            imagePreview.src = product.imagen;
        }

        categoriaSelect.value = product.categoria;
        categoriaSelect.dispatchEvent(new Event('change'));

        if (product.tamanos && Array.isArray(product.tamanos)) {
            sizesContainer.innerHTML = '';
            product.tamanos.forEach(size => addSizeRow(size));
        }
    }

    function addSizeRow(size = null) {
        const newRow = document.createElement('div');
        newRow.classList.add('size-price-row');
        newRow.innerHTML = `
            <div class="flex-grow-1">
                <label class="form-label">Porciones</label>
                <input type="number" class="form-control porciones-input" placeholder="Ej: 15" value="${size ? size.porciones : ''}">
            </div>
            <div class="flex-grow-1">
                <label class="form-label">Precio</label>
                <div class="input-group">
                    <span class="input-group-text">$</span>
                    <input type="number" class="form-control precio-porcion-input" placeholder="Precio" value="${size ? size.precio : ''}">
                </div>
            </div>
            <button type="button" class="remove-size-btn"><i class="fa-solid fa-trash-can"></i></button>
        `;
        sizesContainer.appendChild(newRow);
    }

    // --- 5. ASIGNACIÓN DE EVENT LISTENERS ---

    if (imageInput) {
        imageInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => { imagePreview.src = e.target.result; };
                reader.readAsDataURL(file);
            }
        });
    }

    if (categoriaSelect) {
        categoriaSelect.addEventListener('change', function() {
            const value = this.value;
            if (opcionesTortaDiv) {
                opcionesTortaDiv.classList.toggle('d-none', !value.includes('torta'));
            }
            if (value === 'nueva' && modal) {
                modal.show();
            }
        });
    }

    if (guardarCategoriaBtn && modal) {
        guardarCategoriaBtn.addEventListener('click', function() {
            const nuevaCatTexto = nuevaCategoriaInput.value.trim();
            if (nuevaCatTexto) {
                const nuevaCatValue = nuevaCatTexto.toLowerCase().replace(/\s+/g, '-');
                const option = document.createElement('option');
                option.value = nuevaCatValue;
                option.textContent = nuevaCatTexto;
                
                categoriaSelect.insertBefore(option, categoriaSelect.querySelector('option[value="nueva"]'));
                categoriaSelect.value = nuevaCatValue;
                
                categoriaSelect.dispatchEvent(new Event('change'));
                modal.hide();
                nuevaCategoriaInput.value = '';
            }
        });
    }

    if (addSizeBtn) addSizeBtn.addEventListener('click', () => addSizeRow());

    if (sizesContainer) {
        sizesContainer.addEventListener('click', function(event) {
            const removeButton = event.target.closest('.remove-size-btn');
            if (removeButton) removeButton.closest('.size-price-row').remove();
        });
    }
    
    if (productForm) {
        productForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const tamanosTorta = [];
            if (opcionesTortaDiv && !opcionesTortaDiv.classList.contains('d-none')) {
                const sizeRows = sizesContainer.querySelectorAll('.size-price-row');
                sizeRows.forEach(row => {
                    const porciones = row.querySelector('.porciones-input').value;
                    const precio = row.querySelector('.precio-porcion-input').value;
                    if (porciones && precio) {
                        tamanosTorta.push({ porciones, precio });
                    }
                });
            }

            const productData = {
                codigo: idInput.value,
                nombre: nombreInput.value,
                categoria: categoriaSelect.value,
                descripcion: descripcionInput.value,
                imagen: imageInput.files[0]?.name || (isEditMode ? JSON.parse(localStorage.getItem('productToEdit')).imagen : 'No seleccionada'),
                precioBase: precioInput.value,
                descuento: descuentoInput.value,
                stock: stockInput.value,
                estado: estadoSelect.value,
                tamanos: tamanosTorta
            };

            console.log("Datos del producto guardados (simulación):", productData);
            alert('Producto guardado con éxito (simulación).');

            if (isEditMode) {
                localStorage.removeItem('productToEdit');
            }
            
            // CAMBIO CLAVE: Asegúrate de que el nombre de archivo aquí es correcto.
            window.location.href = 'gestion-productos.html'; // 
            
        });
    }
});