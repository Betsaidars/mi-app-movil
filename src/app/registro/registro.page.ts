import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, 
  IonCard, IonCardContent, IonItem, IonLabel, 
  IonInput, IonButton, IonIcon, IonText 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personAddOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { AuthService } from '../services/auth'; // Verifica que esta ruta sea correcta

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, 
    IonCard, IonCardContent, IonItem, IonLabel, 
    IonInput, IonButton, IonIcon, IonText, 
    CommonModule, FormsModule, ReactiveFormsModule, RouterModule
  ]
})
export class RegistroPage implements OnInit {
  registroForm: FormGroup;
  passwordOculta: boolean = true;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private auth: AuthService
  ) {
    addIcons({ 
  'person-add-outline': personAddOutline, 
  'eye-outline': eyeOutline, 
  'eye-off-outline': eyeOffOutline 
});

    // Configuración del formulario
    this.registroForm = this.fb.group({
      email: ['', [
        Validators.required, 
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {}

  togglePassword() {
    this.passwordOculta = !this.passwordOculta;
  }

  // ESTA ES LA FUNCIÓN QUE LLAMA EL BOTÓN
registrar() {
  console.log('¡Clic detectado!');
  // Quitamos los comentarios para que guarde de verdad
  if (this.registroForm.valid) {
    this.auth.guardarUsuario(this.registroForm.value);
    alert('Usuario guardado. Volviendo al login...');
    this.router.navigate(['/login']);
  } else {
    // Si el formulario es inválido, te avisará por qué
    alert('Revisa los datos: El correo debe ser válido y la clave de 8 caracteres.');
  }
}
}