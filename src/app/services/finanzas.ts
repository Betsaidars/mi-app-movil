import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FinanzasService {
  // Este es el canal de noticias de tu app
  private datosActualizados = new BehaviorSubject<boolean>(true);
  cambios$ = this.datosActualizados.asObservable();

  obtenerMovimientos() {
    const datos = localStorage.getItem('mis_movimientos');
    return datos ? JSON.parse(datos) : [];
  }

  agregarMovimiento(movimiento: any) {
    const movimientos = this.obtenerMovimientos();
    movimientos.push(movimiento);
    localStorage.setItem('mis_movimientos', JSON.stringify(movimientos));
    // Avisamos a las páginas que hay datos nuevos
    this.datosActualizados.next(true);
  }

  calcularTotalPorTipo(tipo: string): number {
  const movimientos = this.obtenerMovimientos();
  const filtrados = movimientos.filter((m: any) => m.tipo === tipo);
  
  // Esto te dirá en la consola cuántos ahorros ha encontrado
  if (tipo === 'ahorro') {
    console.log('Movimientos de ahorro encontrados:', filtrados);
  }

  return filtrados.reduce((acc: number, curr: any) => acc + Number(curr.monto || 0), 0);
}
}