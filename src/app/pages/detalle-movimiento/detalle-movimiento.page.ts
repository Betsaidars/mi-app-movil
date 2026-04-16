import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// REVISA ESTA RUTA: si el servicio está en services/finanzas.ts, esta ruta es la correcta
import { FinanzasService } from '../../services/finanzas'; 
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonButtons, IonBackButton, 
  IonTitle, IonContent, IonList, IonItem, IonLabel, 
  IonNote, IonIcon, IonItemSliding, IonItemOptions, IonItemOption 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trash, walletOutline } from 'ionicons/icons';

@Component({
  selector: 'app-detalle-movimiento',
  templateUrl: './detalle-movimiento.page.html',
  styleUrls: ['./detalle-movimiento.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonHeader, IonToolbar, IonButtons, IonBackButton, 
    IonTitle, IonContent, IonList, IonItem, IonLabel, 
    IonNote, IonIcon, IonItemSliding, IonItemOptions, IonItemOption
  ]
})
export class DetalleMovimientoPage implements OnInit {
  tipo: string = '';
  movimientosFiltrados: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private finanzasService: FinanzasService // Si aquí sigue el error, reinicia el comando "ionic serve"
  ) {
    addIcons({ trash, walletOutline });
  }

  ngOnInit() {
    this.tipo = this.route.snapshot.queryParamMap.get('tipo') || '';
    this.cargarDatos();
  }

  cargarDatos() {
    const todos = this.finanzasService.obtenerMovimientos();
    // Añadimos (m: any) para corregir el error de la imagen image_a347c6.png
    this.movimientosFiltrados = todos.filter((m: any) => m.tipo === this.tipo);
  }

  borrar(indexEnVista: number) {
    const movABorrar = this.movimientosFiltrados[indexEnVista];
    const todos = this.finanzasService.obtenerMovimientos();
    
    // Buscamos el índice real para no borrar el que no es
    const indexReal = todos.findIndex((m: any) => 
      m.fecha === movABorrar.fecha && m.monto === movABorrar.monto
    );

    if (indexReal !== -1) {
      this.finanzasService.eliminarMovimiento(indexReal);
      this.cargarDatos(); // Refresca la lista en pantalla
    }
  }
}