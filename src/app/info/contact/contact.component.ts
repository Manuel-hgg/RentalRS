import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  nombre: string;
  email: string;
  mensaje: string;

  constructor() {
    this.nombre = '';
    this.email = '';
    this.mensaje = '';
  }

  /**
   * Envia un mensaje al correo de soporte de la pagina y muestra un alert avisando de si se ha enviado o no el correo
   */
  async enviar() {
    if (this.comprobarDatos()) {
      emailjs.init(environment.emailjs.publicKey);
      let response = await emailjs.send(environment.emailjs.serviceId, environment.emailjs.templateId, {
        from_name: this.nombre,
        from_email: this.email,
        message: this.mensaje
      });

      if (response.status === 200) {
        alert('Se ha enviado el mensaje, nos pondremos en contacto lo antes posible');
        this.vaciarFormulario();
      } else {
        alert('No se ha podido enviar el mensaje, intentelo más tarde');
      }

    } else {
      alert('Debes rellenar todos los campos');
    }
  }

  /**
   * Comprueba que el usuario haya introducido todos los campos del formulario
   * 
   * @returns true si el usuario introdujo todos los datos, false si faltan datos
   */
  private comprobarDatos(): boolean {
    if (this.nombre === '' || this.email === '' || this.mensaje === '')
      return false;
    else
      return true;
  }

  /**
   * Borra todos los datos del formulario
   */
  private vaciarFormulario() {
    this.nombre = '';
    this.email = '';
    this.mensaje = '';
  }
}
