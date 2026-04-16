import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { 
  IonContent, IonCard, IonCardContent, IonText, 
  IonIcon, IonButton, IonRow, IonCol 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cashOutline, addCircle, trendingDownOutline, walletOutline } from 'ionicons/icons';
import { FinanzasService } from '../services/finanzas';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonCard, IonCardContent, IonText, IonIcon, IonButton, IonRow, IonCol]
})
export class Tab1Page implements OnInit, OnDestroy {
  totalIngresos = 0;
  totalGastos = 0;
  totalAhorros = 0;
  saldoDisponible = 0;
  private sub!: Subscription;


  constructor(
    private finanzasService: FinanzasService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    addIcons({ cashOutline, addCircle, trendingDownOutline, walletOutline });
  }

  ngOnInit() {
    // Escuchamos el "canal de noticias" del servicio
    this.sub = this.finanzasService.cambios$.subscribe(() => {
      this.cargarDatos();
    });
  }

  ionViewWillEnter() { this.cargarDatos(); }

  cargarDatos() {
  // 1. Obtienes los valores del servicio
    this.totalIngresos = this.finanzasService.calcularTotalPorTipo('ingreso');
    this.totalGastos = this.finanzasService.calcularTotalPorTipo('gasto');
    this.totalAhorros = this.finanzasService.calcularTotalPorTipo('ahorro');

    // 2. ACTUALIZAS EL SALDO (Esta es la clave para que el H1 del HTML cambie)
    // Nota: Si quieres que el ahorro NO reste del saldo, quita el "- this.totalAhorros"
    this.saldoDisponible = this.totalIngresos - this.totalGastos - this.totalAhorros;

    // 3. Avisas a Angular que pinte los cambios
    this.cdr.detectChanges();
  }


  // ESTO ARREGLA TU ERROR DE LA IMAGEN
  abrirFormulario(tipo: string) {
    this.router.navigate(['/formulario-movimiento'], { queryParams: { tipo } });
  }

  verDetalles(tipo: string) {
    this.router.navigate(['/detalle-movimiento'], { queryParams: { tipo } });
  }

  ngOnDestroy() { if (this.sub) this.sub.unsubscribe(); }
}