import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Cambiamos esto para que guarde en el "disco duro" del navegador
  guardarUsuario(usuario: any) {
    localStorage.setItem('usuario_registrado', JSON.stringify(usuario));
  }

  // Cambiamos esto para que lo lea del "disco duro"
  obtenerUsuario() {
    const datos = localStorage.getItem('usuario_registrado');
    return datos ? JSON.parse(datos) : null;
  }
  
  // Opcional: Para cuando quieras cerrar sesión y borrar todo
  limpiarDatos() {
    localStorage.removeItem('usuario_registrado');
  }
}