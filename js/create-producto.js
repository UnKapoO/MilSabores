// Archivo: js/create-producto.js (Versión Final Completa)

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SELECCIÓN DE ELEMENTOS DEL DOM ---
    const imageInput = document.getElementById('img-producto');
    const imagePreview = document.getElementById('image-preview');
    const categoriaSelect = document.getElementById('categoria');
    const opcionesTortaDiv = document.getElementById('opciones-torta');
    const productForm = document.querySelector('form');
    const addSizeBtn = document.getElementById('add-size-btn');
    const sizesContainer = document.getElementById('torta-sizes-container');
    
    // Elementos del Modal de Categoría
    const modalElement = document.getElementById('modalCategoria');
    const guardarCategoriaBtn = document.getElementById('guardarCategoria');
    const nuevaCategoriaInput = document.getElementById('idnuevaCategoria');
    const modal = modalElement ? new bootstrap.Modal(modalElement) : null;


    // --- 2. LÓGICA DE PREVISUALIZACIÓN DE IMAGEN ---
    if (imageInput && imagePreview) {
        imageInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => { imagePreview.src = e.target.result; };
                reader.readAsDataURL(file);
            }
        });
    }

    // --- 3. LÓGICA DE CATEGORÍAS ---
    const categorias = {
        "tortas-cuadradas": "Tortas Cuadradas",
        "tortas-circulares": "Tortas Circulares",
        "postres-individuales": "Postres Individuales",
    };

    if (categoriaSelect) {
        // Poblar el menú desplegable
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

        // Evento para mostrar/ocultar campos y abrir modal
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

    // Evento para guardar la nueva categoría desde el modal
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
                
                // Disparamos el evento 'change' manualmente para que se aplique la lógica de tortas si es necesario
                categoriaSelect.dispatchEvent(new Event('change'));

                modal.hide();
                nuevaCategoriaInput.value = '';
            }
        });
    }

    // --- 4. LÓGICA PARA AÑADIR/QUITAR TAMAÑOS DE TORTA ---
    function addSizeRow() {
        const newRow = document.createElement('div');
        newRow.classList.add('size-price-row');
        newRow.innerHTML = `
            <div class="flex-grow-1">
                <label class="form-label">Porciones</label>
                <input type="number" class="form-control porciones-input" placeholder="Ej: 15">
            </div>
            <div class="flex-grow-1">
                <label class="form-label">Precio</label>
                <div class="input-group">
                    <span class="input-group-text">$</span>
                    <input type="number" class="form-control precio-porcion-input" placeholder="Precio">
                </div>
            </div>
            <button type="button" class="remove-size-btn"><i class="fa-solid fa-trash-can"></i></button>
        `;
        sizesContainer.appendChild(newRow);
    }

    if (addSizeBtn) addSizeBtn.addEventListener('click', addSizeRow);
    if (sizesContainer) {
        sizesContainer.addEventListener('click', function(event) {
            const removeButton = event.target.closest('.remove-size-btn');
            if (removeButton) removeButton.closest('.size-price-row').remove();
        });
    }
    
    // --- 5. LÓGICA DEL FORMULARIO ---
    if (productForm) {
        productForm.addEventListener('submit', (event) => {
            event.preventDefault();
            // ... (lógica de guardado que ya tenías) ...
            console.log("Formulario enviado");
        });
    }
});