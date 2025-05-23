import { Route, Routes } from '@angular/router';

export const routes: Route[] = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./components/Authentication/auth.routes').then(
        (m) => m.AuthRoutes
      ),
  },
];
