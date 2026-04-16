import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.page').then(m => m.RegistroPage)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then(m => m.routes)
  },
  {
    path: 'formulario-movimiento',
    loadComponent: () => import('./pages/formulario-movimiento/formulario-movimiento.page').then( m => m.FormularioMovimientoPage)
  },
  {
    path: 'detalle-movimiento',
    loadComponent: () => import('./pages/detalle-movimiento/detalle-movimiento.page').then( m => m.DetalleMovimientoPage)
  }
];