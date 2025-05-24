import { Route } from '@angular/router';

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
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./components/Authentication/auth.routes').then(
        (m) => m.AuthRoutes
      ),
  },
];
