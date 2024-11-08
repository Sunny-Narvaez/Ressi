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
var Mesa = /** @class */ (function () {
    function Mesa(capacidad, numeroDeMesa) {
        this.capacidad = capacidad;
        this.numeroDeMesa = numeroDeMesa;
    }
    return Mesa;
}());
var Cliente = /** @class */ (function () {
    function Cliente(nombre, numeroTelefonico, correo, alergias, historial) {
        this.nombre = nombre;
        this.numeroTelefonico = numeroTelefonico;
        this.correo = correo;
        this.alergias = alergias;
        this.historial = historial;
    }
    return Cliente;
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
        this.hora = new Date(hora);
        this.fecha = new Date(fecha);
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
    ReservacionNormal.prototype.confirmarMenuEspecial = function () {
        console.log("Menu especial confirmado para ".concat(this.cliente.nombre, " en la mesa ").concat(this.mesa.numeroDeMesa));
    };
    ReservacionNormal.prototype.reservaAutomatica = function () {
        console.log("Reserva autom\u00E1tica confirmada para ".concat(this.cliente.nombre, " en la mesa ").concat(this.mesa.numeroDeMesa));
    };
    return ReservacionNormal;
}(Reservacion));
var DiningParty = /** @class */ (function (_super) {
    __extends(DiningParty, _super);
    function DiningParty(cliente, mesa, numeroDeAsistentes, hora, fecha, mesero) {
        return _super.call(this, cliente, mesa, numeroDeAsistentes, hora, fecha, mesero) || this;
    }
    DiningParty.prototype.solicitarDeposito = function () {
        console.log("Dep\u00F3sito solicitado para ".concat(this.cliente.nombre, " en la mesa ").concat(this.mesa.numeroDeMesa));
    };
    DiningParty.prototype.confirmarMenuEspecial = function () {
        console.log("Menu especial confirmado para ".concat(this.cliente.nombre, " en la mesa ").concat(this.mesa.numeroDeMesa));
    };
    return DiningParty;
}(Reservacion));
var ListaDeMesas = /** @class */ (function () {
    function ListaDeMesas() {
        this.mesas = [];
    }
    ListaDeMesas.prototype.crearMesa = function (capacidad, numeroDeMesa) {
        var nuevaMesa = new Mesa(capacidad, numeroDeMesa);
        this.mesas.push(nuevaMesa);
        return nuevaMesa;
    };
    ListaDeMesas.prototype.buscarMesa = function (numeroDeMesa) {
        return this.mesas.find(function (mesa) { return mesa.numeroDeMesa === numeroDeMesa; });
    };
    ListaDeMesas.prototype.eliminarMesa = function (numeroDeMesa) {
        this.mesas = this.mesas.filter(function (mesa) { return mesa.numeroDeMesa !== numeroDeMesa; });
    };
    return ListaDeMesas;
}());
var ListaDeClientes = /** @class */ (function () {
    function ListaDeClientes(reservaciones) {
        this.clientes = [];
        this.reservaciones = reservaciones;
    }
    ListaDeClientes.prototype.agregarCliente = function (cliente) {
        this.clientes.push(cliente);
        return cliente;
    };
    ListaDeClientes.prototype.buscarCliente = function (nombre) {
        return this.clientes.find(function (cliente) { return cliente.nombre === nombre; });
    };
    ListaDeClientes.prototype.eliminarCliente = function (nombre) {
        this.clientes = this.clientes.filter(function (cliente) { return cliente.nombre !== nombre; });
    };
    ListaDeClientes.prototype.buscarReservacion = function (clienteNombre) {
        return this.reservaciones.buscarReservacion(clienteNombre);
    };
    return ListaDeClientes;
}());
var ListaDeReservaciones = /** @class */ (function () {
    function ListaDeReservaciones() {
        this.reservaciones = [];
    }
    ListaDeReservaciones.prototype.eliminarReservacion = function (clienteNombre) {
        this.reservaciones = this.reservaciones.filter(function (reservacion) { return reservacion.cliente.nombre !== clienteNombre; });
    };
    ListaDeReservaciones.prototype.crearReservacion = function (tipo, cliente, mesa, numeroDeAsistentes, hora, fecha, mesero) {
        var nuevaReservacion;
        var horaDate = new Date("1970-01-01T".concat(hora, ":00"));
        var fechaDate = new Date(fecha);
        if (tipo === 'normal') {
            nuevaReservacion = new ReservacionNormal(cliente, mesa, numeroDeAsistentes, horaDate, fechaDate, mesero);
        }
        else if (tipo === 'diningParty') {
            nuevaReservacion = new DiningParty(cliente, mesa, numeroDeAsistentes, horaDate, fechaDate, mesero);
        }
        if (nuevaReservacion) {
            this.reservaciones.push(nuevaReservacion);
        }
        return nuevaReservacion;
    };
    ListaDeReservaciones.prototype.buscarReservacion = function (clienteNombre) {
        return this.reservaciones.find(function (reservacion) { return reservacion.cliente.nombre === clienteNombre; });
    };
    return ListaDeReservaciones;
}());
var SistemaReservas = /** @class */ (function () {
    function SistemaReservas() {
        var listaDeReservaciones = new ListaDeReservaciones();
        this.clientes = new ListaDeClientes(listaDeReservaciones);
        this.mesas = new ListaDeMesas();
        this.reservaciones = new ListaDeReservaciones();
    }
    SistemaReservas.prototype.gestionarReservas = function () {
        // Crear Reserva
        var cliente = this.clientes.buscarCliente("Juan Perez");
        var mesa = this.mesas.buscarMesa(1);
        if (cliente && mesa) {
            this.reservaciones.crearReservacion('normal', cliente, mesa, 4, '20:00', '2023-10-10', 'Carlos');
        }
        // Cancelar Reserva
        this.reservaciones.eliminarReservacion("Juan Perez");
    };
    return SistemaReservas;
}());
// Test the code
var mesa1 = new Mesa(4, 1);
var cliente1 = new Cliente("Juan Perez", "1234567890", "juan.perez@example.com", ["Nueces"], []);
var reserva1 = new ReservaConcreta(cliente1, mesa1, 4, new Date("1970-01-01T18:00:00"), new Date("2023-10-10"), "Carlos");
reserva1.confirmarReserva();
var reservaNormal = new ReservacionNormal(cliente1, mesa1, 4, new Date("1970-01-01T18:00:00"), new Date("2023-10-10"), "Carlos");
reservaNormal.confirmarReserva();
var diningParty = new DiningParty(cliente1, mesa1, 4, new Date("1970-01-01T18:00:00"), new Date("2023-10-10"), "Carlos");
diningParty.confirmarReserva();
diningParty.confirmarMenuEspecial();
