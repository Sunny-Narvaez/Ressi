import java.util.ArrayList;
import java.util.Date;
import java.util.List;

class Mesa {
    private int capacidad;
    private int numeroDeMesa;

    public Mesa(int capacidad, int numeroDeMesa) {
        this.capacidad = capacidad;
        this.numeroDeMesa = numeroDeMesa;
    }

    public int getCapacidad() {
        return capacidad;
    }

    public int getNumeroDeMesa() {
        return numeroDeMesa;
    }
}

class Cliente {
    private String nombre;
    private String numeroTelefonico;
    private String correo;
    private List<String> alergias;
    private List<Reservacion> historial;

    public Cliente(String nombre, String numeroTelefonico, String correo, List<String> alergias, List<Reservacion> historial) {
        this.nombre = nombre;
        this.numeroTelefonico = numeroTelefonico;
        this.correo = correo;
        this.alergias = alergias;
        this.historial = historial;
    }

    public String getNombre() {
        return nombre;
    }
}

abstract class Reservacion {
    protected Cliente cliente;
    protected Mesa mesa;
    protected int numeroDeAsistentes;
    protected Date hora;
    protected Date fecha;
    protected String mesero;

    public Reservacion(Cliente cliente, Mesa mesa, int numeroDeAsistentes, Date hora, Date fecha, String mesero) {
        if (this.getClass() == Reservacion.class) {
            throw new IllegalArgumentException("Cannot instantiate abstract class Reservacion");
        }
        this.cliente = cliente;
        this.mesa = mesa;
        this.numeroDeAsistentes = numeroDeAsistentes;
        this.hora = hora;
        this.fecha = fecha;
        this.mesero = mesero;
    }

    public void confirmarReserva() {
        System.out.println("Reserva confirmada para " + cliente.getNombre() + " en la mesa " + mesa.getNumeroDeMesa());
    }

    public void cancelarReserva() {
        System.out.println("Reserva cancelada para " + cliente.getNombre() + " en la mesa " + mesa.getNumeroDeMesa());
    }
}

class ReservaConcreta extends Reservacion {
    public ReservaConcreta(Cliente cliente, Mesa mesa, int numeroDeAsistentes, Date hora, Date fecha, String mesero) {
        super(cliente, mesa, numeroDeAsistentes, hora, fecha, mesero);
    }
}

class ReservacionNormal extends Reservacion {
    public ReservacionNormal(Cliente cliente, Mesa mesa, int numeroDeAsistentes, Date hora, Date fecha, String mesero) {
        super(cliente, mesa, numeroDeAsistentes, hora, fecha, mesero);
    }

    public void confirmarMenuEspecial() {
        System.out.println("Menu especial confirmado para " + cliente.getNombre() + " en la mesa " + mesa.getNumeroDeMesa());
    }

    public void reservaAutomatica() {
        System.out.println("Reserva automática confirmada para " + cliente.getNombre() + " en la mesa " + mesa.getNumeroDeMesa());
    }
}

class DiningParty extends Reservacion {
    public DiningParty(Cliente cliente, Mesa mesa, int numeroDeAsistentes, Date hora, Date fecha, String mesero) {
        super(cliente, mesa, numeroDeAsistentes, hora, fecha, mesero);
    }

    public void solicitarDeposito() {
        System.out.println("Depósito solicitado para " + cliente.getNombre() + " en la mesa " + mesa.getNumeroDeMesa());
    }

    public void confirmarMenuEspecial() {
        System.out.println("Menu especial confirmado para " + cliente.getNombre() + " en la mesa " + mesa.getNumeroDeMesa());
    }
}

class ListaDeMesas {
    private List<Mesa> mesas;

    public ListaDeMesas() {
        this.mesas = new ArrayList<>();
    }

    public Mesa crearMesa(int capacidad, int numeroDeMesa) {
        Mesa nuevaMesa = new Mesa(capacidad, numeroDeMesa);
        mesas.add(nuevaMesa);
        return nuevaMesa;
    }

    public Mesa buscarMesa(int numeroDeMesa) {
        return mesas.stream().filter(mesa -> mesa.getNumeroDeMesa() == numeroDeMesa).findFirst().orElse(null);
    }

    public void eliminarMesa(int numeroDeMesa) {
        mesas.removeIf(mesa -> mesa.getNumeroDeMesa() == numeroDeMesa);
    }
}

class ListaDeClientes {
    private List<Cliente> clientes;
    private ListaDeReservaciones reservaciones;

    public ListaDeClientes(ListaDeReservaciones reservaciones) {
        this.clientes = new ArrayList<>();
        this.reservaciones = reservaciones;
    }

    public Cliente agregarCliente(Cliente cliente) {
        clientes.add(cliente);
        return cliente;
    }

    public Cliente buscarCliente(String nombre) {
        return clientes.stream().filter(cliente -> cliente.getNombre().equals(nombre)).findFirst().orElse(null);
    }

    public void eliminarCliente(String nombre) {
        clientes.removeIf(cliente -> cliente.getNombre().equals(nombre));
    }

    public Reservacion buscarReservacion(String clienteNombre) {
        return reservaciones.buscarReservacion(clienteNombre);
    }
}

class ListaDeReservaciones {
    private List<Reservacion> reservaciones;

    public ListaDeReservaciones() {
        this.reservaciones = new ArrayList<>();
    }

    public void eliminarReservacion(String clienteNombre) {
        reservaciones.removeIf(reservacion -> reservacion.cliente.getNombre().equals(clienteNombre));
    }

    public Reservacion crearReservacion(String tipo, Cliente cliente, Mesa mesa, int numeroDeAsistentes, Date hora, Date fecha, String mesero) {
        Reservacion nuevaReservacion = null;
        if (tipo.equals("normal")) {
            nuevaReservacion = new ReservacionNormal(cliente, mesa, numeroDeAsistentes, hora, fecha, mesero);
        } else if (tipo.equals("diningParty")) {
            nuevaReservacion = new DiningParty(cliente, mesa, numeroDeAsistentes, hora, fecha, mesero);
        }
        if (nuevaReservacion != null) {
            reservaciones.add(nuevaReservacion);
        }
        return nuevaReservacion;
    }

    public Reservacion buscarReservacion(String clienteNombre) {
        return reservaciones.stream().filter(reservacion -> reservacion.cliente.getNombre().equals(clienteNombre)).findFirst().orElse(null);
    }
}

class SistemaReservas {
    private ListaDeClientes clientes;
    private ListaDeMesas mesas;
    private ListaDeReservaciones reservaciones;

    public SistemaReservas() {
        ListaDeReservaciones listaDeReservaciones = new ListaDeReservaciones();
        this.clientes = new ListaDeClientes(listaDeReservaciones);
        this.mesas = new ListaDeMesas();
        this.reservaciones = new ListaDeReservaciones();
    }

    public void gestionarReservas() {
        // Crear Reserva
        Cliente cliente = clientes.buscarCliente("Juan Perez");
        Mesa mesa = mesas.buscarMesa(1);
        if (cliente != null && mesa != null) {
            reservaciones.crearReservacion("normal", cliente, mesa, 4, new Date(), new Date(), "Carlos");
        }

        // Cancelar Reserva
        reservaciones.eliminarReservacion("Juan Perez");
    }
}

// Test the code
public class Main {
    public static void main(String[] args) {
        Mesa mesa1 = new Mesa(4, 1);
        List<String> alergias = new ArrayList<>();
        alergias.add("Nueces");
        Cliente cliente1 = new Cliente("Juan Perez", "1234567890", "juan.perez@example.com", alergias, new ArrayList<>());
        ReservaConcreta reserva1 = new ReservaConcreta(cliente1, mesa1, 4, new Date(), new Date(), "Carlos");
        reserva1.confirmarReserva();

        ReservacionNormal reservaNormal = new ReservacionNormal(cliente1, mesa1, 4, new Date(), new Date(), "Carlos");
        reservaNormal.confirmarReserva();

        DiningParty diningParty = new DiningParty(cliente1, mesa1, 4, new Date(), new Date(), "Carlos");
        diningParty.confirmarReserva();
        diningParty.confirmarMenuEspecial();
    }
}
