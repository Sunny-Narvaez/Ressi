// Interfaz para Reservacion
interface IReservacion {
    void confirmarReserva();
    void cancelarReserva();
}

// Interfaz para Cliente
interface ICliente {
    String getNombre();
}

// Interfaz para Mesa
interface IMesa {
    String getNumeroDeMesa();
}

// Clase base: Cliente
class Cliente implements ICliente {
    private String nombre;

    public Cliente(String nombre) {
        this.nombre = nombre;
    }

    @Override
    public String getNombre() {
        return nombre;
    }
}

// Clase base: Mesa
class Mesa implements IMesa {
    private String numeroDeMesa;

    public Mesa(String numeroDeMesa) {
        this.numeroDeMesa = numeroDeMesa;
    }

    @Override
    public String getNumeroDeMesa() {
        return numeroDeMesa;
    }
}

// Clase base: Reservacion
abstract class Reservacion implements IReservacion {
    protected Cliente cliente;
    protected Mesa mesa;
    protected int numeroDeAsistentes;
    protected String hora;
    protected String fecha;
    protected String mesero;

    public Reservacion(Cliente cliente, Mesa mesa, int numeroDeAsistentes, String hora, String fecha, String mesero) {
        if (this.getClass() == Reservacion.class) {
            throw new IllegalArgumentException("Cannot instantiate Reservacion directly");
        }
        this.cliente = cliente;
        this.mesa = mesa;
        this.numeroDeAsistentes = numeroDeAsistentes;
        this.hora = hora;
        this.fecha = fecha;
        this.mesero = mesero;
    }

    public abstract void confirmarReserva();
    public abstract void cancelarReserva();
}

// Clase concreta: ReservaConcreta
class ReservaConcreta extends Reservacion {
    public ReservaConcreta(Cliente cliente, Mesa mesa, int numeroDeAsistentes, String hora, String fecha, String mesero) {
        super(cliente, mesa, numeroDeAsistentes, hora, fecha, mesero);
    }

    @Override
    public void confirmarReserva() {
        System.out.println("Reserva confirmada para " + cliente.getNombre() + " en la mesa " + mesa.getNumeroDeMesa());
    }

    @Override
    public void cancelarReserva() {
        System.out.println("Reserva cancelada para " + cliente.getNombre() + " en la mesa " + mesa.getNumeroDeMesa());
    }
}

// Clase concreta: ReservacionNormal
class ReservacionNormal extends Reservacion {
    public ReservacionNormal(Cliente cliente, Mesa mesa, int numeroDeAsistentes, String hora, String fecha, String mesero) {
        super(cliente, mesa, numeroDeAsistentes, hora, fecha, mesero);
    }

    @Override
    public void confirmarReserva() {
        System.out.println("Reservacion normal confirmada para " + cliente.getNombre() + " en la mesa " + mesa.getNumeroDeMesa());
    }

    @Override
    public void cancelarReserva() {
        System.out.println("Reservacion normal cancelada para " + cliente.getNombre() + " en la mesa " + mesa.getNumeroDeMesa());
    }
}

// Clase concreta: SistemaDeReservas
class SistemaDeReservas extends Reservacion {
    public SistemaDeReservas(String nombre, String numeroDeMesa) {
        super(new Cliente(nombre), new Mesa(numeroDeMesa), 0, "", "", "");
    }

    @Override
    public void confirmarReserva() {
        System.out.println("Sistema de reservas confirmado para " + cliente.getNombre() + " en la mesa " + mesa.getNumeroDeMesa());
    }

    @Override
    public void cancelarReserva() {
        System.out.println("Sistema de reservas cancelado para " + cliente.getNombre() + " en la mesa " + mesa.getNumeroDeMesa());
    }

    public String getNombre() {
        return cliente.getNombre();
    }

    public String getNumeroDeMesa() {
        return mesa.getNumeroDeMesa();
    }
}

// Clase principal para probar la herencia
public class Presentacion {
    public static void main(String[] args) {
        // Crear instancias de Cliente y Mesa
        Cliente cliente1 = new Cliente("Juan Perez");
        Mesa mesa1 = new Mesa("1");

        // Crear instancias de Reservacion
        ReservaConcreta reserva1 = new ReservaConcreta(cliente1, mesa1, 4, "18:00", "2023-10-10", "Carlos");
        ReservacionNormal reservaNormal = new ReservacionNormal(cliente1, mesa1, 4, "18:00", "2023-10-10", "Carlos");

        // Usar métodos heredados
        reserva1.confirmarReserva();
        reservaNormal.confirmarReserva();

        // Crear instancia de SistemaDeReservas
        SistemaDeReservas sistema = new SistemaDeReservas("Sistema", "Mesa 1");
        sistema.confirmarReserva();
        sistema.cancelarReserva();
        System.out.println("Nombre del sistema: " + sistema.getNombre());
        System.out.println("Número de mesa del sistema: " + sistema.getNumeroDeMesa());
    }
}