export class Usuario {
    idUsuario: string;
    comentarios: { [idInmueble: string]: string };

    constructor(idUsuario: string) {
        this.idUsuario = idUsuario;
        this.comentarios = {};
    }
}
