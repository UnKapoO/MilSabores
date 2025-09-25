// Archivo: js/pedidos.js

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DATOS DE EJEMPLO DE PEDIDOS ---
    const ordersData = [
        {
            id: "#1024",
            fecha: "2025-09-25",
            cliente: "Carlos Vera",
            items: 3,
            total: 25000,
            estado: "pendiente"
        },
        {
            id: "#1023",
            fecha: "2025-09-25",
            cliente: "María González",
            items: 1,
            total: 18500,
            estado: "en-preparacion"
        },
        {
            id: "#1022",
            fecha: "2025-09-24",
            cliente: "Javier Muñoz",
            items: 5,
            total: 32000,
            estado: "entregado"
        },
        {
            id: "#1021",
            fecha: "2025-09-23",
            cliente: "Ana Torres",
            items: 2,
            total: 45000,
            estado: "entregado"
        },
        {
            id: "#1020",
            fecha: "2025-09-22",
            cliente: "Pedro Rojas",
            items: 1,
            total: 5500,
            estado: "cancelado"
        }
    ];

    // --- 2. SELECCIÓN DE ELEMENTOS DEL DOM ---
    const statusFilter = document.getElementById('status-filter');
    const ordersTableBody = document.getElementById('orders-table-body');

    // --- 3. FUNCIONES ---

    /**
     * Dibuja las filas de la tabla a partir de una lista de pedidos.
     * @param {Array} orders - La lista de pedidos a mostrar.
     */
    function renderOrders(orders) {
        if (!ordersTableBody) return;

        // Limpiamos la tabla antes de dibujar las nuevas filas
        ordersTableBody.innerHTML = '';

        // Si no hay pedidos, mostramos un mensaje
        if (orders.length === 0) {
            const emptyRow = `<tr><td colspan="7" style="text-align: center;">No se encontraron pedidos.</td></tr>`;
            ordersTableBody.innerHTML = emptyRow;
            return;
        }

        orders.forEach(order => {
            const row = document.createElement('tr');
            const formattedTotal = `$${order.total.toLocaleString('es-CL')}`;
            
            row.innerHTML = `
                <td data-label="ID Pedido">${order.id}</td>
                <td data-label="Fecha">${new Date(order.fecha).toLocaleDateString('es-CL')}</td>
                <td data-label="Cliente">${order.cliente}</td>
                <td data-label="Items">${order.items}</td>
                <td data-label="Total">${formattedTotal}</td>
                <td data-label="Estado"><span class="status ${order.estado}">${order.estado.replace('-', ' ')}</span></td>
                <td data-label="Acciones">
                    <button class="action-btn" title="Ver Detalles"><i class="fa-solid fa-eye"></i></button>
                </td>
            `;
            ordersTableBody.appendChild(row);
        });
    }

    /**
     * Filtra los pedidos según el estado seleccionado y los renderiza.
     */
    function filterOrders() {
        const selectedStatus = statusFilter.value;

        if (selectedStatus === 'todos') {
            renderOrders(ordersData); // Muestra todos los pedidos
        } else {
            const filtered = ordersData.filter(order => order.estado === selectedStatus);
            renderOrders(filtered); // Muestra solo los pedidos filtrados
        }
    }

    // --- 4. ASIGNACIÓN DE EVENTOS Y EJECUCIÓN INICIAL ---

    // Añadimos un listener al menú desplegable para que filtre al cambiar
    if (statusFilter) {
        statusFilter.addEventListener('change', filterOrders);
    }

    // Renderizamos la tabla por primera vez al cargar la página
    renderOrders(ordersData);

});