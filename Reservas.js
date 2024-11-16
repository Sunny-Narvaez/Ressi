"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Cliente = (function () {
    function Cliente(nombre) {
        this.nombre = nombre;
    }
    return Cliente;
}());
var Mesa = (function () {
    function Mesa(numeroDeMesa) {
        this.numeroDeMesa = numeroDeMesa;
    }
    return Mesa;
}());
var Reservacion = (function () {
    function Reservacion(cliente, mesa, numeroDeAsistentes, hora, fecha, mesero) {
        var _newTarget = this.constructor;
        if (_newTarget === Reservacion) {
            throw new TypeError("Cannot construct Reservacion instances directly");
        }
        this.cliente = cliente;
        this.mesa = mesa;
        this.numeroDeAsistentes = numeroDeAsistentes;
        this.hora = hora;
        this.fecha = fecha;
        this.mesero = mesero;
    }
    Reservacion.prototype.confirmarReserva = function () {
        console.log("Reserva confirmada para ".concat(this.cliente.nombre, " en la mesa ").concat(this.mesa.numeroDeMesa));
    };
    Reservacion.prototype.cancelarReserva = function () {
        console.log("Reserva cancelada para ".concat(this.cliente.nombre, " en la mesa ").concat(this.mesa.numeroDeMesa));
    };
    return Reservacion;
}());
var ReservaConcreta = (function (_super) {
    __extends(ReservaConcreta, _super);
    function ReservaConcreta(cliente, mesa, numeroDeAsistentes, hora, fecha, mesero) {
        return _super.call(this, cliente, mesa, numeroDeAsistentes, hora, fecha, mesero) || this;
    }
    return ReservaConcreta;
}(Reservacion));
var ReservacionNormal = (function (_super) {
    __extends(ReservacionNormal, _super);
    function ReservacionNormal(cliente, mesa, numeroDeAsistentes, hora, fecha, mesero) {
        return _super.call(this, cliente, mesa, numeroDeAsistentes, hora, fecha, mesero) || this;
    }
    return ReservacionNormal;
}(Reservacion));
var ListaDeReservaciones = (function () {
    function ListaDeReservaciones() {
        this.reservaciones = [];
    }
    ListaDeReservaciones.prototype.buscarReservacion = function (clienteNombre) {
        return this.reservaciones.find(function (reservacion) { return reservacion.cliente.nombre === clienteNombre; });
    };
    ListaDeReservaciones.prototype.crearReservacion = function (tipo, cliente, mesa, numeroDeAsistentes, hora, fecha, mesero) {
        var nuevaReservacion;
        if (tipo === 'normal') {
            nuevaReservacion = new ReservacionNormal(cliente, mesa, numeroDeAsistentes, hora, fecha, mesero);
        }
        else {
            nuevaReservacion = new ReservaConcreta(cliente, mesa, numeroDeAsistentes, hora, fecha, mesero);
        }
        this.reservaciones.push(nuevaReservacion);
        return nuevaReservacion;
    };
    ListaDeReservaciones.prototype.eliminarReservacion = function (clienteNombre) {
        this.reservaciones = this.reservaciones.filter(function (reservacion) { return reservacion.cliente.nombre !== clienteNombre; });
    };
    return ListaDeReservaciones;
}());
var ListaDeMesas = (function () {
    function ListaDeMesas() {
        this.mesas = [];
    }
    ListaDeMesas.prototype.agregarMesa = function (mesa) {
        this.mesas.push(mesa);
    };
    ListaDeMesas.prototype.buscarMesa = function (numeroDeMesa) {
        return this.mesas.find(function (mesa) { return mesa.numeroDeMesa === numeroDeMesa; });
    };
    ListaDeMesas.prototype.eliminarMesa = function (numeroDeMesa) {
        this.mesas = this.mesas.filter(function (mesa) { return mesa.numeroDeMesa !== numeroDeMesa; });
    };
    return ListaDeMesas;
}());
var SistemaDeReservas = (function () {
    function SistemaDeReservas(reservaciones, mesas) {
        this.clientes = [];
        this.reservaciones = reservaciones;
        this.mesas = mesas;
    }
    SistemaDeReservas.prototype.agregarCliente = function (cliente) {
        this.clientes.push(cliente);
        return cliente;
    };
    SistemaDeReservas.prototype.buscarCliente = function (nombre) {
        return this.clientes.find(function (cliente) { return cliente.nombre === nombre; });
    };
    SistemaDeReservas.prototype.eliminarCliente = function (nombre) {
        this.clientes = this.clientes.filter(function (cliente) { return cliente.nombre !== nombre; });
    };
    SistemaDeReservas.prototype.buscarReservacion = function (clienteNombre) {
        return this.reservaciones.buscarReservacion(clienteNombre);
    };
    SistemaDeReservas.prototype.test = function () {
        var cliente = this.buscarCliente("Juan Perez");
        var mesa = this.mesas.buscarMesa("1");
        if (cliente && mesa) {
            this.reservaciones.crearReservacion('normal', cliente, mesa, 4, new Date("1970-01-01T18:00:00"), new Date("2023-10-10"), 'Carlos');
        }
        this.reservaciones.eliminarReservacion("Juan Perez");
    };
    return SistemaDeReservas;
}());
var mesa1 = new Mesa("1");
var cliente1 = new Cliente("Juan Perez");
var reserva1 = new ReservaConcreta(cliente1, mesa1, 4, new Date("1970-01-01T18:00:00"), new Date("2023-10-10"), "Carlos");
reserva1.confirmarReserva();
var reservaNormal = new ReservacionNormal(cliente1, mesa1, 4, new Date("1970-01-01T18:00:00"), new Date("2023-10-10"), "Carlos");
reservaNormal.confirmarReserva();

function updateTopGrid(listType) {
    const topGrid = document.getElementById('top-grid');
    const displayBox = document.getElementById('display-box');
    topGrid.innerHTML = listType;

    // Clear the display box
    displayBox.innerHTML = '';

    if (listType === 'Lista de mesas') {
        // Add a button to create a new table
        const createTableButton = document.createElement('button');
        createTableButton.innerText = 'Crear Mesa';
        createTableButton.onclick = showCreateForm;
        displayBox.appendChild(createTableButton);
    }
    // Add logic for other list types if needed
}

function showCreateForm() {
    document.getElementById('create-form').style.display = 'block';
    document.getElementById('delete-form').style.display = 'none';
    document.getElementById('update-form').style.display = 'none';
    document.getElementById('search-form').style.display = 'none';
}

function showDeleteForm() {
    document.getElementById('delete-form').style.display = 'block';
    document.getElementById('create-form').style.display = 'none';
    document.getElementById('update-form').style.display = 'none';
    document.getElementById('search-form').style.display = 'none';
}

function showUpdateForm() {
    document.getElementById('update-form').style.display = 'block';
    document.getElementById('create-form').style.display = 'none';
    document.getElementById('delete-form').style.display = 'none';
    document.getElementById('search-form').style.display = 'none';
}

function showSearchForm() {
    document.getElementById('search-form').style.display = 'block';
    document.getElementById('create-form').style.display = 'none';
    document.getElementById('delete-form').style.display = 'none';
    document.getElementById('update-form').style.display = 'none';
}

function updateFormFields() {
    const objectType = document.getElementById('object-type').value;
    const formFields = document.getElementById('form-fields');
    formFields.innerHTML = ''; // Clear existing fields

    if (objectType === 'mesa') {
        formFields.innerHTML = `
            <label for="mesa-num">Número de mesa:</label>
            <input type="text" id="mesa-num">
            <label for="mesa-capacidad">Capacidad:</label>
            <input type="text" id="mesa-capacidad">
        `;
    } else if (objectType === 'cliente') {
        formFields.innerHTML = `
            <label for="cliente-nombre">Nombre del cliente:</label>
            <input type="text" id="cliente-nombre">
            <label for="cliente-email">Email:</label>
            <input type="email" id="cliente-email">
        `;
    } else if (objectType === 'reservacion') {
        formFields.innerHTML = `
            <label for="reservacion-fecha">Fecha de reservación:</label>
            <input type="date" id="reservacion-fecha">
            <label for="reservacion-hora">Hora:</label>
            <input type="time" id="reservacion-hora">
        `;
    }
}

function updateDeleteFormFields() {
    const objectType = document.getElementById('delete-object-type').value;
    const formFields = document.getElementById('delete-form-fields');
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

function updateUpdateFormFields() {
    const objectType = document.getElementById('update-object-type').value;
    const formFields = document.getElementById('update-form-fields');
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

function updateSearchFormFields() {
    const objectType = document.getElementById('search-object-type').value;
    const formFields = document.getElementById('search-form-fields');
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

function createObject() {
    const objectType = document.getElementById('object-type').value;
    let data = {};

    if (objectType === 'mesa') {
        data.numMesa = document.getElementById('mesa-num').value;
        data.capacidad = document.getElementById('mesa-capacidad').value;
    } else if (objectType === 'cliente') {
        data.nombreCliente = document.getElementById('cliente-nombre').value;
        data.emailCliente = document.getElementById('cliente-email').value;
    } else if (objectType === 'reservacion') {
        data.fechaReservacion = document.getElementById('reservacion-fecha').value;
        data.horaReservacion = document.getElementById('reservacion-hora').value;
    }

    console.log('Creating object:', objectType, data);
    // Add your logic to create the object

    // Hide the create form after creation
    document.getElementById('create-form').style.display = 'none';
}

function deleteObject() {
    const objectType = document.getElementById('delete-object-type').value;
    let data = {};

    if (objectType === 'mesa') {
        data.numMesa = document.getElementById('delete-num-mesa').value;
    } else if (objectType === 'cliente') {
        data.nombreCliente = document.getElementById('delete-nombre-cliente').value;
    } else if (objectType === 'reservacion') {
        data.fechaReservacion = document.getElementById('delete-fecha-reservacion').value;
    }

    console.log('Deleting object:', objectType, data);
    // Add your logic to delete the object
}

function updateObject() {
    const objectType = document.getElementById('update-object-type').value;
    let data = {};

    if (objectType === 'mesa') {
        data.numMesa = document.getElementById('update-num-mesa').value;
        data.capacidad = document.getElementById('update-capacidad-mesa').value;
    } else if (objectType === 'cliente') {
        data.nombreCliente = document.getElementById('update-nombre-cliente').value;
        data.emailCliente = document.getElementById('update-email-cliente').value;
    } else if (objectType === 'reservacion') {
        data.fechaReservacion = document.getElementById('update-fecha-reservacion').value;
        data.horaReservacion = document.getElementById('update-hora-reservacion').value;
    }

    console.log('Updating object:', objectType, data);
    // Add your logic to update the object
}

function searchObject() {
    const objectType = document.getElementById('search-object-type').value;
    let data = {};

    if (objectType === 'mesa') {
        data.numMesa = document.getElementById('search-num-mesa').value;
    } else if (objectType === 'cliente') {
        data.nombreCliente = document.getElementById('search-nombre-cliente').value;
    } else if (objectType === 'reservacion') {
        data.fechaReservacion = document.getElementById('search-fecha-reservacion').value;
    }

    console.log('Searching object:', objectType, data);
    // Add your logic to search the object
}

function hideUpdateForm() {
    document.getElementById('update-form').style.display = 'none';
}

function showFetchForm() {
    document.getElementById('fetch-form').style.display = 'block';
}

function hideFetchForm() {
    document.getElementById('fetch-form').style.display = 'none';
}

function handleUpdateObject() {
    const objectType = document.getElementById('update-object-type').value;
    let data = {};

    if (objectType === 'mesa') {
        data.numMesa = document.getElementById('update-num-mesa').value;
    } else if (objectType === 'cliente') {
        data.nombreCliente = document.getElementById('update-nombre-cliente').value;
    } else if (objectType === 'reservacion') {
        data.fechaReservacion = document.getElementById('update-fecha-reservacion').value;
    }

    updateObject(objectType, data);

    // Hide the update form
    hideUpdateForm();
}

function handleFetchObject() {
    const objectType = document.getElementById('fetch-object-type').value;
    let data = {};

    if (objectType === 'mesa') {
        data.numMesa = document.getElementById('fetch-num-mesa').value;
    } else if (objectType === 'cliente') {
        data.nombreCliente = document.getElementById('fetch-nombre-cliente').value;
    } else if (objectType === 'reservacion') {
        data.fechaReservacion = document.getElementById('fetch-fecha-reservacion').value;
    }

    fetchObject(objectType, data);

    // Hide the fetch form
    hideFetchForm();
}
//# sourceMappingURL=Reservas.js.map