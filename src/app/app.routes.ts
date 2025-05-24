import { Route } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./components/Home/home.routes').then((m) => m.HomeRoutes),
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./components/Authentication/auth.routes').then(
        (m) => m.AuthRoutes
      ),
  },
];
