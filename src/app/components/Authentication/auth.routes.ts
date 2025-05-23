import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const AuthRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
