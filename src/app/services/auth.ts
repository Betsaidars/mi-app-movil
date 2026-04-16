import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService { // <--- El "export" es fundamental
  private usuarioRegistrado: any = null;

  constructor() { }

  guardarUsuario(datos: any) {
    this.usuarioRegistrado = datos;
  }

  obtenerUsuario() {
    return this.usuarioRegistrado;
  }
}