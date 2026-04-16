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
import { walletOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, 
    IonCard, IonCardContent, IonItem, IonLabel, 
    IonInput, IonButton, IonIcon, IonText, 
    CommonModule, FormsModule, ReactiveFormsModule, RouterModule
  ]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  passwordOculta: boolean = true;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private auth: AuthService
  ) {
    addIcons({ walletOutline, eyeOutline, eyeOffOutline });

    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required, 
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {}

  togglePassword() { this.passwordOculta = !this.passwordOculta; }

  irARegistro() {
    this.router.navigate(['/registro']);
  }

entrar() {
  const datosRegistro = this.auth.obtenerUsuario();
  const { email, password } = this.loginForm.value;

  if (datosRegistro && email === datosRegistro.email && password === datosRegistro.password) {
    console.log('¡Datos correctos! Intentando entrar...');
    
    // Cambiamos navigateByUrl por navigate y usamos la ruta base de tabs
    this.router.navigateByUrl('/tabs/tab1');

  } else {
    alert('Usuario no encontrado o datos incorrectos.');
  }
}


}