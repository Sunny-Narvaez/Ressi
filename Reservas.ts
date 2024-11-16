
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

    confirmarReserva() {
        console.log(`Reserva confirmada para ${this.cliente.nombre} en la mesa ${this.mesa.numeroDeMesa}`);
    }

    cancelarReserva() {
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

    crearReservacion(tipo: string, cliente: Cliente, mesa: Mesa, numeroDeAsistentes: number, hora: Date, fecha: Date, mesero: string): Reservacion | undefined {
        let nuevaReservacion;
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

    agregarMesa(mesa: Mesa) {
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
    mesas: ListaDeMesas;
    reservaciones: ListaDeReservaciones;

    constructor(reservaciones: ListaDeReservaciones, mesas: ListaDeMesas) {
        this.clientes = [];
        this.reservaciones = reservaciones;
        this.mesas = mesas;
    }

    agregarCliente(cliente: Cliente) {
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

    test() {
        const cliente = this.buscarCliente("Juan Perez");
        const mesa = this.mesas.buscarMesa("1");
        if (cliente && mesa) {
            this.reservaciones.crearReservacion('normal', cliente, mesa, 4, new Date("1970-01-01T18:00:00"), new Date("2023-10-10"), 'Carlos');
        }

        // Cancelar Reserva
        this.reservaciones.eliminarReservacion("Juan Perez");
    }
}

// Test the code
const mesa1 = new Mesa("1");
const cliente1 = new Cliente("Juan Perez");
const reserva1 = new ReservaConcreta(cliente1, mesa1, 4, new Date("1970-01-01T18:00:00"), new Date("2023-10-10"), "Carlos");
reserva1.confirmarReserva();

const reservaNormal = new ReservacionNormal(cliente1, mesa1, 4, new Date("1970-01-01T18:00:00"), new Date("2023-10-10"), "Carlos");
reservaNormal.confirmarReserva();