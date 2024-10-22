export function newProduct() {
    const buttonNewProduct = document.getElementById('agregarProducto');
    buttonNewProduct.addEventListener('click', () => {
        const modal = crearProductModal(); // Crear el modal
        document.body.appendChild(modal);

        document
            .getElementById('crearProductoBtn')
            .addEventListener('click', () => {
                const title = document.getElementById('title').value;
                const description =
                    document.getElementById('description').value;
                const price = document.getElementById('price').value;
                const thumbnail = document.getElementById('thumbnail').files[0]; // Obtener el archivo
                const category = document.getElementById('category').value;

                // Validar que el precio sea un número positivo
                if (price < 0) {
                    alert('El precio debe ser un número positivo');
                    return;
                }

                // Validar que la categoría sea válida
                const validCategories = ['bebidas', 'comidas', 'postres'];
                if (!validCategories.includes(category)) {
                    alert(`${category} no es una categoría válida`);
                    return;
                }

                // Crear un FormData para enviar los datos, incluyendo el archivo
                const formData = new FormData();
                formData.append('title', title);
                formData.append('description', description);
                formData.append('price', price);
                formData.append('thumbnail', thumbnail); // Agregar el archivo
                formData.append('category', category);

                crearNuevoProducto(formData);
                console.log(formData);

                document.body.removeChild(modal); // Eliminar el modal después de la creación
            });

        document
            .getElementById('cancelarProductoBtn')
            .addEventListener('click', () => {
                document.body.removeChild(modal);
            });
    });
}
async function crearNuevoProducto(data) {
    try {
        const response = await fetch('api/product', {
            method: 'POST',
            body: data,
        });
        console.log(response);
        if (response.ok) {
            alert('el producto fue agregado');
        }
    } catch (error) {
        alert('error reinicia la pagina');
    }
}

function crearProductModal() {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';

    // Crear el contenido de la ventana modal para el producto
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'white';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '5px';
    modalContent.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';

    // Agregar campos para ingresar los datos del producto
    modalContent.innerHTML = `
        <h2>Crear Producto</h2>
        <label for="title">Título:</label>
        <input type="text" id="title" required />
        <label for="description">Descripción:</label>
        <input type="text" id="description" required />
        <label for="price">Precio:</label>
        <input type="number" id="price" min="0" required />
        <label for="thumbnail"></label>
        <input type="file" id="thumbnail" required />
        <label for="category">Categoría:</label>
        <select id="category" required>
            <option value="">Seleccionar categoría</option>
            <option value="bebidas">Bebidas</option>
            <option value="comidas">Comidas</option>
            <option value="postres">Postres</option>
        </select>
        <div>
            <button id="crearProductoBtn">Crear</button>
            <button id="cancelarProductoBtn">Cancelar</button>
        </div>
    `;

    modal.appendChild(modalContent); // Agregar contenido al modal
    return modal; // Retornar el modal creado
}

export async function getUsers() {
    try {
        const usersContainer = document.getElementById('containerUsers');
        const response = await fetch('api/users');
        const users = await response.json();
        mostrarUsuarios(users, usersContainer);
    } catch (error) {
        alert(error);
    }
}

function mostrarUsuarios(users, usersContainer) {
    users.forEach((user, index) => {
        const userElement = document.createElement('div');
        const deleteButton = `button-${index}`;

        userElement.innerHTML = `
             <p>${user.nombre}</p>
             <p>${user.apellido}</p> 
             <p>${user.dni}</p>
             <p>${user._id}</p>
             <button id="${deleteButton}">eliminar <button>
           
             `;
        usersContainer.appendChild(userElement);

        const deleteBotonId = document.getElementById(deleteButton);
        deleteUser(deleteBotonId, user._id);
    });
}

async function deleteUser(mibotonId, usuarioId) {
    if (mibotonId) {
        mibotonId.addEventListener('click', async () => {
            const deleteUserResponse = await fetch(`api/users/${usuarioId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (deleteUserResponse.ok) {
                alert('usuario eliminado');
                location.reload();
            }
        });
    }
}

export async function crearUsuario() {
    const buttonCrearUsuario = document.getElementById('agregarUsuario');
    buttonCrearUsuario.addEventListener('click', () => {
        const modal = crearModal();
        document.body.appendChild(modal);
        document
            .getElementById('crearUsuarioBtn')
            .addEventListener('click', () => {
                const dni = document.getElementById('dni').value;
                const nombre = document.getElementById('nombre').value;
                const apellido = document.getElementById('apellido').value;
                const password = document.getElementById('password').value;
                const rol = document.getElementById('rol').value;
                const data = { dni, nombre, apellido, password, rol };
                crearNuevoUsuario(data);

                document.body.removeChild(modal);
            });

        document.getElementById('cancelarBtn').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    });
}

async function crearNuevoUsuario(data) {
    const responseCreateUser = await fetch('api/sessions/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    console.log(responseCreateUser);
    if (responseCreateUser.ok) {
        alert('usuario creado');
        location.reload();
    }
}

function crearModal() {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';

    // Crear el contenido de la ventana modal
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'white';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '5px';
    modalContent.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';

    // Agregar campos para ingresar datos
    modalContent.innerHTML = `
        <h2>Crear Usuario</h2>
        <label for="dni">DNI:</label>
        <input type="text" id="dni" required />
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" required />
        <label for="apellido">Apellido:</label>
        <input type="text" id="apellido" required />
        <label for="password">Contraseña:</label>
        <input type="password" id="password" required />
        <label for="rol">Rol:</label>
        <select id="rol" required>
            <option value="">Seleccionar rol</option>
            <option value="mesero">Mesero</option>
            <option value="admin">Admin</option>
            <option value="cajero">Cajero</option>
        </select>
        <div>
            <button id="crearUsuarioBtn">Crear</button>
            <button id="cancelarBtn">Cancelar</button>
        </div>
    `;

    modal.appendChild(modalContent); // Agregar contenido al modal
    return modal; // Retornar el modal creado
}
export async function getProducts() {
    try {
        const container = document.querySelector('.containerProducts');
        const response = await fetch('api/product');
        const productos = await response.json();

        renderProducts(container, productos);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

export function redirectButtonUser() {
    document.getElementById('users')?.addEventListener('click', () => {
        window.location.href = '/usuarios';
    });
}

export async function getProductsByCategory() {
    setupCategoryButton('comidas', 'comidas');
    setupCategoryButton('postres', 'postres');
    setupCategoryButton('bebidas', 'bebidas');

    const response = await fetch('api/users/67083522e5adc622c295ff06');
    const user = await response.json();
    localStorage.setItem('userData', JSON.stringify(user));
}

function setupCategoryButton(buttonId, category) {
    const button = document.getElementById(buttonId);
    if (!button) return;

    button.addEventListener('click', async () => {
        try {
            const container = document.querySelector('.containerProducts');
            const response = await fetch(`api/product/${category}`);
            const productos = await response.json();

            container.innerHTML = '';
            renderProducts(container, productos);
        } catch (error) {
            console.error(`Error fetching ${category} products:`, error);
        }
    });
}

function renderProducts(container, productos) {
    productos.forEach((producto) => {
        const productoElement = productoInner(producto);
        container.appendChild(productoElement);
    });
}

function buttonRolInner(rol) {
    switch (rol) {
        case 'admin':
            return `
                <button class="deleteProduct">Eliminar</button>
                <button class="updateProduct">Editar</button>
            `;
        case 'mesero':
            return `
                <div class="cantidad-container">
                    <label for="cantidad">Cantidad:</label>
                    <div class="input-group">
                      
                        <input type="number" id="cantidad" name="cantidad" value="1" min="1" />
                       
                    </div>
                </div>
                <button class="agregarPedido">Agregar al pedido</button>
            `;
        default:
            return '';
    }
}

function productoInnerHTML(producto, rol) {
    return `
        <h3>${producto.title}</h3>
        <img src="${producto.thumbnail}" alt="Imagen del producto" />
        <p>descripcion: ${producto.description}</p>
        <p>$${producto.price}</p>
        <p style="font-size: 12px;">ID: ${producto._id}</p>
        ${buttonRolInner(rol)}
    `;
}

function productoInner(producto) {
    const rol = 'mesero'; // Hardcoded for now
    const productoElement = document.createElement('div');
    productoElement.innerHTML = productoInnerHTML(producto, rol);

    assignProductEvents(productoElement, rol, producto);
    return productoElement;
}

function assignProductEvents(productoElement, rol, producto) {
    if (rol === 'admin') {
        const productDelete = productoElement.querySelector('.deleteProduct');
        const productUpdate = productoElement.querySelector('.updateProduct');

        productDelete?.addEventListener('click', () =>
            deleteProduct(producto._id)
        );
        productUpdate?.addEventListener('click', () =>
            updateProduct(productUpdate, producto)
        );
    } else if (rol === 'mesero') {
        const btnAgregarPedido =
            productoElement.querySelector('.agregarPedido');

        btnAgregarPedido?.addEventListener('click', () => {
            agregarPedido(producto);
        });
    }
}
// Función para abrir el modal

async function agregarPedido(producto) {
    const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString);
    const pedidoDataString = localStorage.getItem('pedido');
    const pedidoData = JSON.parse(pedidoDataString);

    if (!pedidoData) {
        const response = await fetch(`api/pedido`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: userData.nombre,
                dni: userData.dni,
            }),
        });
        const pedido = await response.json();

        localStorage.setItem('pedido', JSON.stringify(pedido._id));
    }
    agregarProductoAlPedido(pedidoData, producto);
}

async function agregarProductoAlPedido(pedidoId, producto) {
    const cantidad = document.querySelector('#cantidad').value;


    const data = {
        cantidad: parseInt(cantidad),
    };
    console.log(data)
    /*
    console.log('pedidoID=',pedidoId)
    console.log('productiID=',producto._id)

    const  response = await fetch(`api/pedido/${pedidoId}/${producto._id}`,{
        method : 'POST',
        body: JSON.stringify({
            cantidad: userData.nombre,
           
        }),
    });
    const pedido = await response.json();
    console.log(pedido);*/
}

function deleteProduct(productDelete, productId) {
    productDelete.addEventListener('click', async () => {
        const response = await fetch(`api/product/${productId}`, {
            method: 'DELETE',
        });
        console.log(response);
        if (response.ok) {
            alert('producto eliminado');
            location.reload();
        } else {
            alert('error a elimar producto');
        }
    });
}

function updateProduct(productUpdate, product) {
    productUpdate.addEventListener('click', async () => {
        const modal = craerUpdateModal(product);
        document.body.appendChild(modal);
        document
            .getElementById('actualizarProductoBtn')
            .addEventListener('click', async () => {
                const title = document.getElementById('title').value;
                const description =
                    document.getElementById('description').value;
                const price = document.getElementById('price').value;
                const thumbnail = document.getElementById('thumbnail').files[0]; // Obtener el archivo
                const category = document.getElementById('category').value;

                // Validar que el precio sea un número positivo
                if (price < 0) {
                    alert('El precio debe ser un número positivo');
                    return;
                }

                // Validar que la categoría sea válida
                const validCategories = ['bebidas', 'comidas', 'postres'];
                if (!validCategories.includes(category)) {
                    alert(`${category} no es una categoría válida`);
                    return;
                }
                // Crear un FormData para enviar los datos, incluyendo el archivo
                const formData = new FormData();
                formData.append('title', title);
                formData.append('description', description);
                formData.append('price', price);
                console.log('thubaril', thumbnail);
                if (thumbnail) {
                    formData.append('thumbnail', thumbnail); // Agregar el archivo
                }
                formData.append('category', category);

                sendDataProductUpdate(formData, product._id);
            });
    });
}

async function sendDataProductUpdate(data, productId) {
    const response = await fetch(`api/product/${productId}`, {
        method: 'PUT',
        body: data,
    });
    if (response.ok) {
        alert('producto actualizado');
        location.reload();
    } else {
        alert('error a actualizar el  producto');
    }
}

function craerUpdateModal(producto) {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';

    // Crear el contenido de la ventana modal para el producto
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'white';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '5px';
    modalContent.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';

    // Agregar campos para ingresar los datos del producto
    modalContent.innerHTML = `
        <h2>Actualizar Producto</h2>
        <label for="title">Título:</label>
        <input type="text" id="title" value="${producto.title}" required />
        <label for="description">Descripción:</label>
        <input type="text" id="description" value="${
            producto.description
        }" required />
        <label for="price">Precio:</label>
        <input type="number" id="price" value="${
            producto.price
        }" min="0" required />
        <label for="thumbnail">Imagen:</label>
        <input type="file" id="thumbnail" />
        <label for="category">Categoría:</label>
        <select id="category" required>
            <option value="" disabled>Seleccionar categoría</option>
            <option value="bebidas" ${
                producto.category === 'bebidas' ? 'selected' : ''
            }>Bebidas</option>
            <option value="comidas" ${
                producto.category === 'comidas' ? 'selected' : ''
            }>Comidas</option>
            <option value="postres" ${
                producto.category === 'postres' ? 'selected' : ''
            }>Postres</option>
        </select>
        <div>
            <button id="actualizarProductoBtn">Actualizar</button>
            <button id="cancelarProductoBtn">Cancelar</button>
        </div>
    `;
    modal.appendChild(modalContent); // Agregar contenido al modal
    return modal; // Retornar el modal creado
}
