import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonContent, IonCard, IonCardContent, IonText, 
  IonIcon, IonButton, IonRow, IonCol 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cashOutline, addCircle, trendingDownOutline, walletOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonContent, IonCard, IonCardContent, 
    IonText, IonIcon, IonButton, IonRow, IonCol
  ],
})
export class Tab1Page {
  // 1. Variables para guardar los montos
  totalIngresos: number = 0;
  totalGastos: number = 0;
  totalAhorros: number = 0;

  // 2. Cálculo del saldo (Ingresos menos Gastos)
  get saldoDisponible(): number {
    return this.totalIngresos - this.totalGastos;
  }

  constructor() {
    // Registro de los iconos para que aparezcan
    addIcons({ cashOutline, addCircle, trendingDownOutline, walletOutline });
  }

  // 3. Funciones que llama el HTML al hacer click
  agregarIngreso() {
    this.totalIngresos += 1000;
  }

  agregarGasto() {
    this.totalGastos += 500;
  }

  agregarAhorro() {
    this.totalAhorros += 100;
  }
}