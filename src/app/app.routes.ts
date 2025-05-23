import { Route, Routes } from '@angular/router';
import { HomeComponent } from './components/Home/home.component';

export const routes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./components/Authentication/auth.routes').then(
        (m) => m.AuthRoutes
      ),
  },
];
