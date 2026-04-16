import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, 
  IonButtons, IonBackButton, IonList, IonItem, 
  IonLabel, IonNote, IonIcon 
} from '@ionic/angular/standalone';
// Importamos tu servicio (fíjate que la ruta sube dos niveles)
import { FinanzasService } from '../../services/finanzas';
import { addIcons } from 'ionicons';
import { walletOutline } from 'ionicons/icons';

@Component({
  selector: 'app-detalle-movimiento',
  templateUrl: './detalle-movimiento.page.html',
  styleUrls: ['./detalle-movimiento.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonContent, IonHeader, IonTitle, IonToolbar, 
    IonButtons, IonBackButton, IonList, IonItem, 
    IonLabel, IonNote, IonIcon
  ]
})
export class DetalleMovimientoPage implements OnInit {
  tipo: string = '';
  movimientosFiltrados: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private finanzasService: FinanzasService
  ) {
    addIcons({ walletOutline });
  }

  ngOnInit() {
    // Leemos qué queremos ver: 'ingreso', 'gasto' o 'ahorro'
    this.tipo = this.route.snapshot.queryParamMap.get('tipo') || '';
    this.cargarDatos();
  }

  cargarDatos() {
    const todos = this.finanzasService.obtenerMovimientos();
    this.movimientosFiltrados = todos.filter((m: any) => m.tipo === this.tipo);
  }
}