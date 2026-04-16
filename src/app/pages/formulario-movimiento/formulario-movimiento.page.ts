import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para el pipe titlecase
import { FormsModule } from '@angular/forms'; // ¡VITAL para el ngModel!
import { ActivatedRoute, Router } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, 
  IonButtons, IonBackButton, IonItem, IonLabel, 
  IonInput, IonIcon, IonButton, IonDatetime, 
  IonDatetimeButton, IonModal 
} from '@ionic/angular/standalone'; // Importamos los componentes de Ionic
import { addIcons } from 'ionicons';
import { cashOutline, pricetagOutline, checkmarkDoneOutline } from 'ionicons/icons';
import { FinanzasService } from '../../services/finanzas';

@Component({
  selector: 'app-formulario-movimiento',
  templateUrl: './formulario-movimiento.page.html',
  styleUrls: ['./formulario-movimiento.page.scss'],
  standalone: true, // Tu proyecto usa standalone
  imports: [
    CommonModule, FormsModule, IonContent, IonHeader, 
    IonTitle, IonToolbar, IonButtons, IonBackButton, 
    IonItem, IonLabel, IonInput, IonIcon, IonButton, 
    IonDatetime, IonDatetimeButton, IonModal
  ]
})
export class FormularioMovimientoPage implements OnInit {
  tipo: string = '';
  nuevoMovimiento = {
    monto: null,
    destino: '',
    fecha: new Date().toISOString(),
    tipo: ''
  };

  constructor(
    private route: ActivatedRoute,
    private finanzasService: FinanzasService,
    private router: Router
  ) {
    // Registramos los iconos que usamos en el HTML del formulario
    addIcons({ cashOutline, pricetagOutline, checkmarkDoneOutline });
  }

  ngOnInit() {
  // Capturamos el tipo de la URL
  this.tipo = this.route.snapshot.queryParamMap.get('tipo') || '';
  
  // Forzamos que el objeto nuevoMovimiento tenga ese tipo
  this.nuevoMovimiento.tipo = this.tipo;
  
  console.log('Formulario abierto para tipo:', this.tipo);
}

guardar() {
  // ... tus validaciones ...
  this.finanzasService.agregarMovimiento({...this.nuevoMovimiento});
  // Volvemos a la pestaña principal
  this.router.navigate(['/tabs/tab1']);
}


}