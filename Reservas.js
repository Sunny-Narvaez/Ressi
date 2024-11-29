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
var _a, _b, _c, _d, _e, _f, _g, _h;
var Cliente = /** @class */ (function () {
    function Cliente(nombre) {
        this.nombre = nombre;
    }
    return Cliente;
}());
var Mesa = /** @class */ (function () {
    function Mesa(numeroDeMesa) {
        this.numeroDeMesa = numeroDeMesa;
    }
    return Mesa;
}());
var Reservacion = /** @class */ (function () {
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
var ReservaConcreta = /** @class */ (function (_super) {
    __extends(ReservaConcreta, _super);
    function ReservaConcreta(cliente, mesa, numeroDeAsistentes, hora, fecha, mesero) {
        return _super.call(this, cliente, mesa, numeroDeAsistentes, hora, fecha, mesero) || this;
    }
    return ReservaConcreta;
}(Reservacion));
var ReservacionNormal = /** @class */ (function (_super) {
    __extends(ReservacionNormal, _super);
    function ReservacionNormal(cliente, mesa, numeroDeAsistentes, hora, fecha, mesero) {
        return _super.call(this, cliente, mesa, numeroDeAsistentes, hora, fecha, mesero) || this;
    }
    return ReservacionNormal;
}(Reservacion));
var ListaDeReservaciones = /** @class */ (function () {
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
var ListaDeMesas = /** @class */ (function () {
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
var SistemaDeReservas = /** @class */ (function () {
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
var currentListType = 'Lista de reservaciones'; // Default list type
function toggleForm(formId) {
    var forms = ['create-form', 'delete-form', 'update-form', 'search-form'];
    forms.forEach(function (id) {
        var formElement = document.getElementById(id);
        if (formElement) {
            formElement.style.display = id === formId ? 'block' : 'none';
        }
    });
}
// Example usage:
(_a = document.getElementById('show-create-form-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return toggleForm('create-form'); });
(_b = document.getElementById('show-delete-form-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () { return toggleForm('delete-form'); });
(_c = document.getElementById('show-update-form-btn')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () { return toggleForm('update-form'); });
(_d = document.getElementById('show-search-form-btn')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () { return toggleForm('search-form'); });
(_e = document.getElementById('object-type')) === null || _e === void 0 ? void 0 : _e.addEventListener('change', function (event) {
    var target = event.target;
    updateFormFields(target.value, document.getElementById('form-fields'), '', '', '', '', '', '');
});
(_f = document.getElementById('delete-object-type')) === null || _f === void 0 ? void 0 : _f.addEventListener('change', function (event) {
    var target = event.target;
    updateFormFields(target.value, document.getElementById('delete-form-fields'), '', '', '', '', '', '');
});
(_g = document.getElementById('update-object-type')) === null || _g === void 0 ? void 0 : _g.addEventListener('change', function (event) {
    var target = event.target;
    updateFormFields(target.value, document.getElementById('update-form-fields'), '', '', '', '', '', '');
});
(_h = document.getElementById('search-object-type')) === null || _h === void 0 ? void 0 : _h.addEventListener('change', function (event) {
    var target = event.target;
    updateFormFields(target.value, document.getElementById('search-form-fields'), '', '', '', '', '', '');
});
// Removed duplicate function implementation
function toggleDropdown(dropdownId) {
    var dropdown = document.getElementById(dropdownId);
    if (dropdown) {
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    }
}
function closeCreateForm() {
    var createForm = document.getElementById('create-form');
    if (createForm) {
        createForm.style.display = 'none';
    }
}
function closeDeleteForm() {
    var deleteForm = document.getElementById('delete-form');
    if (deleteForm) {
        deleteForm.style.display = 'none';
    }
}
function showUpdateForm() {
    var updateForm = document.getElementById('update-form');
    if (updateForm) {
        updateForm.style.display = 'block';
    }
    var createForm = document.getElementById('create-form');
    if (createForm) {
        createForm.style.display = 'none';
    }
    var deleteForm = document.getElementById('delete-form');
    if (deleteForm) {
        deleteForm.style.display = 'none';
    }
    var searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.style.display = 'none';
    }
}
function closeUpdateForm() {
    var updateForm = document.getElementById('update-form');
    if (updateForm) {
        updateForm.style.display = 'none';
    }
}
function showSearchForm() {
    var searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.style.display = 'block';
    }
    var createForm = document.getElementById('create-form');
    if (createForm) {
        createForm.style.display = 'none';
    }
    var deleteForm = document.getElementById('delete-form');
    if (deleteForm) {
        deleteForm.style.display = 'none';
    }
    var updateForm = document.getElementById('update-form');
    if (updateForm) {
        updateForm.style.display = 'none';
    }
}
function closeSearchForm() {
    var searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.style.display = 'none';
    }
}
function updateFormFields(value, element, p0, p1, p2, p3, p4, p5) {
    var objectType = document.getElementById('object-type').value;
    var formFields = document.getElementById('form-fields');
    formFields.innerHTML = ''; // Clear existing fields
    if (objectType === 'mesa') {
        formFields.innerHTML = "\n            <label for=\"mesa-num\">N\u00FAmero de mesa:</label>\n            <input type=\"text\" id=\"mesa-num\">\n            <label for=\"mesa-capacidad\">Capacidad:</label>\n            <input type=\"text\" id=\"mesa-capacidad\">\n        ";
    }
}
function updateDeleteFormFields() {
    var objectType = document.getElementById('delete-object-type').value;
    var formFields = document.getElementById('delete-form-fields');
    formFields.innerHTML = ''; // Clear existing fields
    if (objectType === 'mesa') {
        formFields.innerHTML = "\n            <label for=\"delete-num-mesa\">N\u00FAmero de mesa:</label>\n            <input type=\"text\" id=\"delete-num-mesa\">\n        ";
    }
    else if (objectType === 'cliente') {
        formFields.innerHTML = "\n            <label for=\"delete-nombre-cliente\">Nombre del cliente:</label>\n            <input type=\"text\" id=\"delete-nombre-cliente\">\n        ";
    }
    else if (objectType === 'reservacion') {
        formFields.innerHTML = "\n            <label for=\"delete-fecha-reservacion\">Fecha de reservaci\u00F3n:</label>\n            <input type=\"date\" id=\"delete-fecha-reservacion\">\n        ";
    }
}
function updateUpdateFormFields() {
    var objectType = document.getElementById('update-object-type').value;
    var formFields = document.getElementById('update-form-fields');
    formFields.innerHTML = ''; // Clear existing fields
    if (objectType === 'mesa') {
        formFields.innerHTML = "\n            <label for=\"update-num-mesa\">N\u00FAmero de mesa:</label>\n            <input type=\"text\" id=\"update-num-mesa\">\n            <label for=\"update-capacidad-mesa\">Capacidad:</label>\n            <input type=\"text\" id=\"update-capacidad-mesa\">\n        ";
    }
    else if (objectType === 'cliente') {
        formFields.innerHTML = "\n            <label for=\"update-nombre-cliente\">Nombre del cliente:</label>\n            <input type=\"text\" id=\"update-nombre-cliente\">\n            <label for=\"update-email-cliente\">Email:</label>\n            <input type=\"email\" id=\"update-email-cliente\">\n        ";
    }
    else if (objectType === 'reservacion') {
        formFields.innerHTML = "\n            <label for=\"update-fecha-reservacion\">Fecha de reservaci\u00F3n:</label>\n            <input type=\"date\" id=\"update-fecha-reservacion\">\n            <label for=\"update-hora-reservacion\">Hora:</label>\n            <input type=\"time\" id=\"update-hora-reservacion\">\n        ";
    }
}
function updateSearchFormFields() {
    var objectType = document.getElementById('search-object-type').value;
    var formFields = document.getElementById('search-form-fields');
    formFields.innerHTML = ''; // Clear existing fields
    if (objectType === 'mesa') {
        formFields.innerHTML = "\n            <label for=\"search-num-mesa\">N\u00FAmero de mesa:</label>\n            <input type=\"text\" id=\"search-num-mesa\">\n        ";
    }
    else if (objectType === 'cliente') {
        formFields.innerHTML = "\n            <label for=\"search-nombre-cliente\">Nombre del cliente:</label>\n            <input type=\"text\" id=\"search-nombre-cliente\">\n        ";
    }
    else if (objectType === 'reservacion') {
        formFields.innerHTML = "\n            <label for=\"search-fecha-reservacion\">Fecha de reservaci\u00F3n:</label>\n            <input type=\"date\" id=\"search-fecha-reservacion\">\n        ";
    }
}
function createObject() {
    var _a, _b;
    var objectType = document.getElementById('object-type').value;
    var newObject = {};
    if (objectType === 'mesa') {
        newObject = {
            type: 'mesa',
            number: document.getElementById('mesa-number').value,
            capacity: document.getElementById('mesa-capacity').value
        };
        // Save to localStorage
        saveToLocalStorage('mesas', newObject);
        // Create a button for the new mesa
        var button = document.createElement('button');
        button.textContent = "Mesa ".concat(newObject.number);
        button.classList.add('mesa-button');
        button.setAttribute('data-type', 'mesa'); // Add data-type attribute
        // Create a dropdown for additional information
        var dropdown = document.createElement('div');
        dropdown.classList.add('dropdown-content');
        dropdown.innerHTML = "\n            <p>Capacidad: ".concat(newObject.capacity, "</p>\n        ");
        // Append the dropdown to the button
        button.appendChild(dropdown);
        // Append the button to the display-box container
        (_a = document.getElementById('display-box')) === null || _a === void 0 ? void 0 : _a.appendChild(button);
    }
    else if (objectType === 'cliente') {
        newObject = {
            type: 'cliente',
            name: document.getElementById('cliente-name').value,
            email: document.getElementById('cliente-email').value
        };
        // Save to localStorage
        saveToLocalStorage('clientes', newObject);
        // Create a button for the new cliente
        var button = document.createElement('button');
        button.textContent = "Cliente ".concat(newObject.name);
        button.classList.add('cliente-button');
        button.setAttribute('data-type', 'cliente'); // Add data-type attribute
        // Create a dropdown for additional information
        var dropdown = document.createElement('div');
        dropdown.classList.add('dropdown-content');
        dropdown.innerHTML = "\n            <p>Email: ".concat(newObject.email, "</p>\n        ");
        // Append the dropdown to the button
        button.appendChild(dropdown);
        // Append the button to the display-box container
        (_b = document.getElementById('display-box')) === null || _b === void 0 ? void 0 : _b.appendChild(button);
    }
}
function saveToLocalStorage(key, value) {
    var existingData = JSON.parse(localStorage.getItem(key) || '[]');
    existingData.push(value);
    localStorage.setItem(key, JSON.stringify(existingData));
}
function loadFromLocalStorage() {
    var mesas = JSON.parse(localStorage.getItem('mesas') || '[]');
    var clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
    mesas.forEach(function (mesa) {
        var _a;
        // Create a button for the mesa
        var button = document.createElement('button');
        button.textContent = "Mesa ".concat(mesa.number);
        button.classList.add('mesa-button');
        button.setAttribute('data-type', 'mesa'); // Add data-type attribute
        // Create a dropdown for additional information
        var dropdown = document.createElement('div');
        dropdown.classList.add('dropdown-content');
        dropdown.innerHTML = "\n            <p>Capacidad: ".concat(mesa.capacity, "</p>\n        ");
        // Append the dropdown to the button
        button.appendChild(dropdown);
        // Append the button to the display-box container
        (_a = document.getElementById('display-box')) === null || _a === void 0 ? void 0 : _a.appendChild(button);
    });
    clientes.forEach(function (cliente) {
        var _a;
        // Create a button for the cliente
        var button = document.createElement('button');
        button.textContent = "Cliente ".concat(cliente.name);
        button.classList.add('cliente-button');
        button.setAttribute('data-type', 'cliente'); // Add data-type attribute
        // Create a dropdown for additional information
        var dropdown = document.createElement('div');
        dropdown.classList.add('dropdown-content');
        dropdown.innerHTML = "\n            <p>Email: ".concat(cliente.email, "</p>\n        ");
        // Append the dropdown to the button
        button.appendChild(dropdown);
        // Append the button to the display-box container
        (_a = document.getElementById('display-box')) === null || _a === void 0 ? void 0 : _a.appendChild(button);
    });
}
// Call loadFromLocalStorage when the page loads
window.addEventListener('load', loadFromLocalStorage);
