import { Reserva } from "./reserva";

export class Usuario {
    idUsuario: string;
    comentarios: { [idInmueble: string]: string };
    solicitudes: Reserva[];
    alquileresRealizados: Reserva[];

    constructor(idUsuario: string) {
        this.idUsuario = idUsuario;
        this.comentarios = {};
        this.solicitudes = [];
        this.alquileresRealizados = [];
    }
}
