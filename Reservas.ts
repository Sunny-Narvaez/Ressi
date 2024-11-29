class Cliente {
    nombre: string;

    constructor(nombre: string) {
        this.nombre = nombre;
    }
}

class Mesa {
    numeroDeMesa: string;

    constructor(numeroDeMesa: string) {
        this.numeroDeMesa = numeroDeMesa;
    }
}

abstract class Reservacion {
    cliente: Cliente;
    mesa: Mesa;
    numeroDeAsistentes: number;
    hora: Date;
    fecha: Date;
    mesero: string;

    constructor(cliente: Cliente, mesa: Mesa, numeroDeAsistentes: number, hora: Date, fecha: Date, mesero: string) {
        if (new.target === Reservacion) {
            throw new TypeError("Cannot construct Reservacion instances directly");
        }
        this.cliente = cliente;
        this.mesa = mesa;
        this.numeroDeAsistentes = numeroDeAsistentes;
        this.hora = hora;
        this.fecha = fecha;
        this.mesero = mesero;
    }

    confirmarReserva(): void {
        console.log(`Reserva confirmada para ${this.cliente.nombre} en la mesa ${this.mesa.numeroDeMesa}`);
    }

    cancelarReserva(): void {
        console.log(`Reserva cancelada para ${this.cliente.nombre} en la mesa ${this.mesa.numeroDeMesa}`);
    }
}

class ReservaConcreta extends Reservacion {
    constructor(cliente: Cliente, mesa: Mesa, numeroDeAsistentes: number, hora: Date, fecha: Date, mesero: string) {
        super(cliente, mesa, numeroDeAsistentes, hora, fecha, mesero);
    }
}

class ReservacionNormal extends Reservacion {
    constructor(cliente: Cliente, mesa: Mesa, numeroDeAsistentes: number, hora: Date, fecha: Date, mesero: string) {
        super(cliente, mesa, numeroDeAsistentes, hora, fecha, mesero);
    }
}

class ListaDeReservaciones {
    reservaciones: Reservacion[];

    constructor() {
        this.reservaciones = [];
    }

    buscarReservacion(clienteNombre: string): Reservacion | undefined {
        return this.reservaciones.find(reservacion => reservacion.cliente.nombre === clienteNombre);
    }

    crearReservacion(tipo: string, cliente: Cliente, mesa: Mesa, numeroDeAsistentes: number, hora: Date, fecha: Date, mesero: string): Reservacion {
        let nuevaReservacion: Reservacion;
        if (tipo === 'normal') {
            nuevaReservacion = new ReservacionNormal(cliente, mesa, numeroDeAsistentes, hora, fecha, mesero);
        } else {
            nuevaReservacion = new ReservaConcreta(cliente, mesa, numeroDeAsistentes, hora, fecha, mesero);
        }
        this.reservaciones.push(nuevaReservacion);
        return nuevaReservacion;
    }

    eliminarReservacion(clienteNombre: string): void {
        this.reservaciones = this.reservaciones.filter(reservacion => reservacion.cliente.nombre !== clienteNombre);
    }
}

class ListaDeMesas {
    mesas: Mesa[];

    constructor() {
        this.mesas = [];
    }

    agregarMesa(mesa: Mesa): void {
        this.mesas.push(mesa);
    }

    buscarMesa(numeroDeMesa: string): Mesa | undefined {
        return this.mesas.find(mesa => mesa.numeroDeMesa === numeroDeMesa);
    }

    eliminarMesa(numeroDeMesa: string): void {
        this.mesas = this.mesas.filter(mesa => mesa.numeroDeMesa !== numeroDeMesa);
    }
}

class SistemaDeReservas {
    clientes: Cliente[];
    reservaciones: ListaDeReservaciones;
    mesas: ListaDeMesas;

    constructor(reservaciones: ListaDeReservaciones, mesas: ListaDeMesas) {
        this.clientes = [];
        this.reservaciones = reservaciones;
        this.mesas = mesas;
    }

    agregarCliente(cliente: Cliente): Cliente {
        this.clientes.push(cliente);
        return cliente;
    }

    buscarCliente(nombre: string): Cliente | undefined {
        return this.clientes.find(cliente => cliente.nombre === nombre);
    }

    eliminarCliente(nombre: string): void {
        this.clientes = this.clientes.filter(cliente => cliente.nombre !== nombre);
    }

    buscarReservacion(clienteNombre: string): Reservacion | undefined {
        return this.reservaciones.buscarReservacion(clienteNombre);
    }

    test(): void {
        const cliente = this.buscarCliente("Juan Perez");
        const mesa = this.mesas.buscarMesa("1");
        if (cliente && mesa) {
            this.reservaciones.crearReservacion('normal', cliente, mesa, 4, new Date("1970-01-01T18:00:00"), new Date("2023-10-10"), 'Carlos');
        }
        this.reservaciones.eliminarReservacion("Juan Perez");
    }
}

const mesa1 = new Mesa("1");
const cliente1 = new Cliente("Juan Perez");
const reserva1 = new ReservaConcreta(cliente1, mesa1, 4, new Date("1970-01-01T18:00:00"), new Date("2023-10-10"), "Carlos");
reserva1.confirmarReserva();
const reservaNormal = new ReservacionNormal(cliente1, mesa1, 4, new Date("1970-01-01T18:00:00"), new Date("2023-10-10"), "Carlos");
reservaNormal.confirmarReserva();

let currentListType = 'Lista de reservaciones'; // Default list type

function toggleForm(formId: string): void {
    const forms = ['create-form', 'delete-form', 'update-form', 'search-form'];
    forms.forEach(id => {
        const formElement = document.getElementById(id);
        if (formElement) {
            formElement.style.display = id === formId ? 'block' : 'none';
        }
    });
}


// Example usage:
document.getElementById('show-create-form-btn')?.addEventListener('click', () => toggleForm('create-form'));
document.getElementById('show-delete-form-btn')?.addEventListener('click', () => toggleForm('delete-form'));
document.getElementById('show-update-form-btn')?.addEventListener('click', () => toggleForm('update-form'));
document.getElementById('show-search-form-btn')?.addEventListener('click', () => toggleForm('search-form'));

document.getElementById('object-type')?.addEventListener('change', (event) => {
    const target = event.target as HTMLSelectElement;
    updateFormFields(target.value, document.getElementById('form-fields') as HTMLElement, '', '', '', '', '', '');
});

document.getElementById('delete-object-type')?.addEventListener('change', (event) => {
    const target = event.target as HTMLSelectElement;
    updateFormFields(target.value, document.getElementById('delete-form-fields') as HTMLElement, '', '', '', '', '', '');
});

document.getElementById('update-object-type')?.addEventListener('change', (event) => {
    const target = event.target as HTMLSelectElement;
    updateFormFields(target.value, document.getElementById('update-form-fields') as HTMLElement, '', '', '', '', '', '');
});

document.getElementById('search-object-type')?.addEventListener('change', (event) => {
    const target = event.target as HTMLSelectElement;
    updateFormFields(target.value, document.getElementById('search-form-fields') as HTMLElement, '', '', '', '', '', '');
});

// Removed duplicate function implementation

function toggleDropdown(dropdownId: string): void {
    const dropdown = document.getElementById(dropdownId);
    if (dropdown) {
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    }
}

function closeCreateForm(): void {
    const createForm = document.getElementById('create-form');
    if (createForm) {
        createForm.style.display = 'none';
    }
}

function closeDeleteForm(): void {
    const deleteForm = document.getElementById('delete-form');
    if (deleteForm) {
        deleteForm.style.display = 'none';
    }
}

function showUpdateForm(): void {
    const updateForm = document.getElementById('update-form');
    if (updateForm) {
        updateForm.style.display = 'block';
    }
    const createForm = document.getElementById('create-form');
    if (createForm) {
        createForm.style.display = 'none';
    }
    const deleteForm = document.getElementById('delete-form');
    if (deleteForm) {
        deleteForm.style.display = 'none';
    }
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.style.display = 'none';
    }
}

function closeUpdateForm(): void {
    const updateForm = document.getElementById('update-form');
    if (updateForm) {
        updateForm.style.display = 'none';
    }
}

function showSearchForm(): void {
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.style.display = 'block';
    }
    const createForm = document.getElementById('create-form');
    if (createForm) {
        createForm.style.display = 'none';
    }
    const deleteForm = document.getElementById('delete-form');
    if (deleteForm) {
        deleteForm.style.display = 'none';
    }
    const updateForm = document.getElementById('update-form');
    if (updateForm) {
        updateForm.style.display = 'none';
    }
}

function closeSearchForm(): void {
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.style.display = 'none';
    }
}

function updateFormFields(value: string, element: HTMLElement, p0: string, p1: string, p2: string, p3: string, p4: string, p5: string): void {
    const objectType = (document.getElementById('object-type') as HTMLSelectElement).value;
    const formFields = document.getElementById('form-fields') as HTMLElement;
    formFields.innerHTML = ''; // Clear existing fields

    if (objectType === 'mesa') {
        formFields.innerHTML = `
            <label for="mesa-num">Número de mesa:</label>
            <input type="text" id="mesa-num">
            <label for="mesa-capacidad">Capacidad:</label>
            <input type="text" id="mesa-capacidad">
        `;
    }
}

function updateDeleteFormFields(): void {
    const objectType = (document.getElementById('delete-object-type') as HTMLSelectElement).value;
    const formFields = document.getElementById('delete-form-fields') as HTMLElement;
    formFields.innerHTML = ''; // Clear existing fields

    if (objectType === 'mesa') {
        formFields.innerHTML = `
            <label for="delete-num-mesa">Número de mesa:</label>
            <input type="text" id="delete-num-mesa">
        `;
    } else if (objectType === 'cliente') {
        formFields.innerHTML = `
            <label for="delete-nombre-cliente">Nombre del cliente:</label>
            <input type="text" id="delete-nombre-cliente">
        `;
    } else if (objectType === 'reservacion') {
        formFields.innerHTML = `
            <label for="delete-fecha-reservacion">Fecha de reservación:</label>
            <input type="date" id="delete-fecha-reservacion">
        `;
    }
}

function updateUpdateFormFields(): void {
    const objectType = (document.getElementById('update-object-type') as HTMLSelectElement).value;
    const formFields = document.getElementById('update-form-fields') as HTMLElement;
    formFields.innerHTML = ''; // Clear existing fields

    if (objectType === 'mesa') {
        formFields.innerHTML = `
            <label for="update-num-mesa">Número de mesa:</label>
            <input type="text" id="update-num-mesa">
            <label for="update-capacidad-mesa">Capacidad:</label>
            <input type="text" id="update-capacidad-mesa">
        `;
    } else if (objectType === 'cliente') {
        formFields.innerHTML = `
            <label for="update-nombre-cliente">Nombre del cliente:</label>
            <input type="text" id="update-nombre-cliente">
            <label for="update-email-cliente">Email:</label>
            <input type="email" id="update-email-cliente">
        `;
    } else if (objectType === 'reservacion') {
        formFields.innerHTML = `
            <label for="update-fecha-reservacion">Fecha de reservación:</label>
            <input type="date" id="update-fecha-reservacion">
            <label for="update-hora-reservacion">Hora:</label>
            <input type="time" id="update-hora-reservacion">
        `;
    }
}

function updateSearchFormFields(): void {
    const objectType = (document.getElementById('search-object-type') as HTMLSelectElement).value;
    const formFields = document.getElementById('search-form-fields') as HTMLElement;
    formFields.innerHTML = ''; // Clear existing fields

    if (objectType === 'mesa') {
        formFields.innerHTML = `
            <label for="search-num-mesa">Número de mesa:</label>
            <input type="text" id="search-num-mesa">
        `;
    } else if (objectType === 'cliente') {
        formFields.innerHTML = `
            <label for="search-nombre-cliente">Nombre del cliente:</label>
            <input type="text" id="search-nombre-cliente">
        `;
    } else if (objectType === 'reservacion') {
        formFields.innerHTML = `
            <label for="search-fecha-reservacion">Fecha de reservación:</label>
            <input type="date" id="search-fecha-reservacion">
        `;
    }
}

function createObject(): void {
    const objectType = (document.getElementById('object-type') as HTMLSelectElement).value;
    let newObject: { [key: string]: string } = {};

    if (objectType === 'mesa') {
        newObject = {
            type: 'mesa',
            number: (document.getElementById('mesa-number') as HTMLInputElement).value,
            capacity: (document.getElementById('mesa-capacity') as HTMLInputElement).value
        };

        // Save to localStorage
        saveToLocalStorage('mesas', newObject);

        // Create a button for the new mesa
        const button = document.createElement('button');
        button.textContent = `Mesa ${newObject.number}`;
        button.classList.add('mesa-button');
        button.setAttribute('data-type', 'mesa'); // Add data-type attribute

        // Create a dropdown for additional information
        const dropdown = document.createElement('div');
        dropdown.classList.add('dropdown-content');
        dropdown.innerHTML = `
            <p>Capacidad: ${newObject.capacity}</p>
        `;

        // Append the dropdown to the button
        button.appendChild(dropdown);

        // Append the button to the display-box container
        document.getElementById('display-box')?.appendChild(button);
    } else if (objectType === 'cliente') {
        newObject = {
            type: 'cliente',
            name: (document.getElementById('cliente-name') as HTMLInputElement).value,
            email: (document.getElementById('cliente-email') as HTMLInputElement).value
        };

        // Save to localStorage
        saveToLocalStorage('clientes', newObject);

        // Create a button for the new cliente
        const button = document.createElement('button');
        button.textContent = `Cliente ${newObject.name}`;
        button.classList.add('cliente-button');
        button.setAttribute('data-type', 'cliente'); // Add data-type attribute

        // Create a dropdown for additional information
        const dropdown = document.createElement('div');
        dropdown.classList.add('dropdown-content');
        dropdown.innerHTML = `
            <p>Email: ${newObject.email}</p>
        `;

        // Append the dropdown to the button
        button.appendChild(dropdown);

        // Append the button to the display-box container
        document.getElementById('display-box')?.appendChild(button);
    }
}

function saveToLocalStorage(key: string, value: any): void {
    const existingData = JSON.parse(localStorage.getItem(key) || '[]');
    existingData.push(value);
    localStorage.setItem(key, JSON.stringify(existingData));
}

function loadFromLocalStorage(): void {
    const mesas = JSON.parse(localStorage.getItem('mesas') || '[]');
    const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');

    mesas.forEach((mesa: any) => {
        // Create a button for the mesa
        const button = document.createElement('button');
        button.textContent = `Mesa ${mesa.number}`;
        button.classList.add('mesa-button');
        button.setAttribute('data-type', 'mesa'); // Add data-type attribute

        // Create a dropdown for additional information
        const dropdown = document.createElement('div');
        dropdown.classList.add('dropdown-content');
        dropdown.innerHTML = `
            <p>Capacidad: ${mesa.capacity}</p>
        `;

        // Append the dropdown to the button
        button.appendChild(dropdown);

        // Append the button to the display-box container
        document.getElementById('display-box')?.appendChild(button);
    });

    clientes.forEach((cliente: any) => {
        // Create a button for the cliente
        const button = document.createElement('button');
        button.textContent = `Cliente ${cliente.name}`;
        button.classList.add('cliente-button');
        button.setAttribute('data-type', 'cliente'); // Add data-type attribute

        // Create a dropdown for additional information
        const dropdown = document.createElement('div');
        dropdown.classList.add('dropdown-content');
        dropdown.innerHTML = `
            <p>Email: ${cliente.email}</p>
        `;

        // Append the dropdown to the button
        button.appendChild(dropdown);

        // Append the button to the display-box container
        document.getElementById('display-box')?.appendChild(button);
    });
}

// Call loadFromLocalStorage when the page loads
window.addEventListener('load', loadFromLocalStorage);