const TicketList = require("./ticket-list");


class Sockets {

    constructor(io) {

        this.io = io;

        //Crear la instancia de nuestro ticketlist
        this.ticketlist = new TicketList();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {
            console.log('cliente connectado');

            // Escuchar evento: solicitar-ticket
            socket.on('solicitar-ticket', (data, callback) => {
                const nuevoTicket = this.ticketlist.crearTicket();
                callback(nuevoTicket);
            });

            socket.on('siguiente-ticket-trabajar', ({ agente, escritorio }, callback) => {
                const suTicket = this.ticketlist.aasignarTicket(agente, escritorio);
                callback(suTicket);

                this.io.emit('ticket-asignado', this.ticketlist.ultimos13);

            });


        });
    }


}


module.exports = Sockets;