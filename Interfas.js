"use strict";
class Interfaz {
    constructor() {
        this.initEventListeners();
    }
    // Inicializar los listeners de eventos
    initEventListeners() {
        const botonEjemplo = document.getElementById('botonEjemplo');
        if (botonEjemplo) {
            botonEjemplo.addEventListener('click', this.handleButtonClick.bind(this));
        }
    }
    // Manejar el evento de click del botón
    handleButtonClick(event) {
        console.log('Botón clickeado');
        // Aquí puedes conectar con las clases del sistema
        // Ejemplo: 
        // let sistema = new Sistema();
        // sistema.realizarAccion();
    }
}
TextMetrics;
// Inicializar la interfaz cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    new Interfaz();
});
