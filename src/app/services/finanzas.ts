import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinanzasService {
  // Usamos un solo canal de comunicación para evitar errores
  private actualizarTab1 = new BehaviorSubject<boolean>(true);
  cambios$ = this.actualizarTab1.asObservable();

  constructor() {}

  obtenerMovimientos() {
    const datos = localStorage.getItem('mis_movimientos');
    return datos ? JSON.parse(datos) : [];
  }

  agregarMovimiento(movimiento: any) {
    const movimientos = this.obtenerMovimientos();
    movimientos.push(movimiento);
    localStorage.setItem('mis_movimientos', JSON.stringify(movimientos));
    this.actualizarTab1.next(true);
  }

  calcularTotalPorTipo(tipo: string): number {
    const movimientos = this.obtenerMovimientos();
    const filtrados = movimientos.filter((m: any) => m.tipo === tipo);
    return filtrados.reduce((acc: number, curr: any) => acc + Number(curr.monto || 0), 0);
  }

  eliminarMovimiento(index: number) {
    const movimientos = this.obtenerMovimientos();
    movimientos.splice(index, 1);
    localStorage.setItem('mis_movimientos', JSON.stringify(movimientos));
    this.actualizarTab1.next(true); // Avisa a Tab1 para actualizar el saldo
  }
}