import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Aquí guardaremos el usuario temporalmente
  private usuarioRegistrado: any = null;

  guardarUsuario(datos: any) {
    this.usuarioRegistrado = datos;
  }

  obtenerUsuario() {
    return this.usuarioRegistrado;
  }
}