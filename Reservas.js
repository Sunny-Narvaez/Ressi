class Mesa {
    capacidad: number;
    numeroDeMesa: number;

    constructor(capacidad: number, numeroDeMesa: number) {
        this.capacidad = capacidad;
        this.numeroDeMesa = numeroDeMesa;
    }
}

class Cliente {
    nombre: string;
    numeroTelefonico: string;
    correo: string;
    alergias: string[];
    historial: Reservacion[];

    constructor(nombre: string, numeroTelefonico: string, correo: string, alergias: string[], historial: Reservacion[]) {
        this.nombre = nombre;
        this.numeroTelefonico = numeroTelefonico;
        this.correo = correo;
        this.alergias = alergias;
        this.historial = historial;
    }
}

abstract class Reservacion {
    cliente: Cliente;
    mesa: Mesa;
    numeroDeAsistentes: number;
    hora: string;
    fecha: string;
    mesero: string;

    constructor(cliente: Cliente, mesa: Mesa, numeroDeAsistentes: number, hora: string, fecha: string, mesero: string) {
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
    constructor(cliente, mesa, numeroDeAsistentes, hora, fecha, mesero) {
        super(cliente, mesa, numeroDeAsistentes, hora, fecha, mesero);
    }
}

class ReservacionNormal extends Reservacion {
    constructor(cliente, mesa, numeroDeAsistentes, hora, fecha, mesero) {
        super(cliente, mesa, numeroDeAsistentes, hora, fecha, mesero);
    }

    confirmarMenuEspecial(): void {
        console.log(`Menu especial confirmado para ${this.cliente.nombre} en la mesa ${this.mesa.numeroDeMesa}`);
    }

    reservaAutomatica() {
        console.log(`Reserva automática confirmada para ${this.cliente.nombre} en la mesa ${this.mesa.numeroDeMesa}`);
    }
}

class DiningParty extends Reservacion {
    constructor(cliente, mesa, numeroDeAsistentes, hora, fecha, mesero) {
        super(cliente, mesa, numeroDeAsistentes, hora, fecha, mesero);
    }

    solicitarDeposito() {
        console.log(`Depósito solicitado para ${this.cliente.nombre} en la mesa ${this.mesa.numeroDeMesa}`);
    }

    confirmarMenuEspecial() {
        console.log(`Menu especial confirmado para ${this.cliente.nombre} en la mesa ${this.mesa.numeroDeMesa}`);
    }
}

class ListaDeMesas {
    mesas: Mesa[];

    constructor() {
        this.mesas = [];
    }

    crearMesa(capacidad: number, numeroDeMesa: number): Mesa {
        const nuevaMesa = new Mesa(capacidad, numeroDeMesa);
        this.mesas.push(nuevaMesa);
        return nuevaMesa;
    }

    buscarMesa(numeroDeMesa: number): Mesa | undefined {
        return this.mesas.find(mesa => mesa.numeroDeMesa === numeroDeMesa);
    }

    eliminarMesa(numeroDeMesa: number): void {
        this.mesas = this.mesas.filter(mesa => mesa.numeroDeMesa !== numeroDeMesa);
    }
}

class ListaDeClientes {
    clientes: Cliente[];

    constructor() {
        this.clientes = [];
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
        // Implementar lógica para buscar reservación
    }
}

class ListaDeReservaciones {
    reservaciones: Reservacion[];

    constructor() {
        this.reservaciones = [];
    }

    eliminarReservacion(clienteNombre: string): void {
        this.reservaciones = this.reservaciones.filter(reservacion => reservacion.cliente.nombre !== clienteNombre);
    }

    crearReservacion(tipo: string, cliente: Cliente, mesa: Mesa, numeroDeAsistentes: number, hora: string, fecha: string, mesero: string): Reservacion | undefined {
        let nuevaReservacion;
        if (tipo === 'normal') {
            nuevaReservacion = new ReservacionNormal(cliente, mesa, numeroDeAsistentes, hora, fecha, mesero);
        } else if (tipo === 'diningParty') {
            nuevaReservacion = new DiningParty(cliente, mesa, numeroDeAsistentes, hora, fecha, mesero);
        }
        this.reservaciones.push(nuevaReservacion);
        return nuevaReservacion;
    }

    buscarReservacion(clienteNombre: string): Reservacion | undefined {
        return this.reservaciones.find(reservacion => reservacion.cliente.nombre === clienteNombre);
    }
}

class SistemaReservas {
    clientes: ListaDeClientes;
    mesas: ListaDeMesas;
    reservaciones: ListaDeReservaciones;

    constructor() {
        this.clientes = new ListaDeClientes();
        this.mesas = new ListaDeMesas();
        this.reservaciones = new ListaDeReservaciones();
    }

    gestionarReservas() {
        // Crear Reserva
        const cliente = this.clientes.buscarCliente("Juan Perez");
        const mesa = this.mesas.buscarMesa(1);
        if (cliente && mesa) {
            this.reservaciones.crearReservacion('normal', cliente, mesa, 4, '20:00', '2023-10-10', 'Carlos');
        }

        // Cancelar Reserva
        this.reservaciones.eliminarReservacion("Juan Perez");
    }
}

const mesa1 = new Mesa(4, 1);
const cliente1 = new Cliente("Juan Perez", "1234567890", "juan.perez@example.com", ["Nueces"], []);
const reserva1 = new ReservaConcreta(cliente1, mesa1, 4, "18:00", "2023-10-10", "Carlos");
reserva1.confirmarReserva();

const reservaNormal = new ReservacionNormal(cliente1, mesa1, 4, "18:00", "2023-10-10", "Carlos");
reservaNormal.confirmarReserva();

const diningParty = new DiningParty(cliente1, mesa1, 4, "18:00", "2023-10-10", "Carlos");
diningParty.confirmarReserva();
diningParty.confirmarMenuEspecial();