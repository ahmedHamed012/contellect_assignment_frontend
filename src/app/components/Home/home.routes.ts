import { Route } from '@angular/router';

export const HomeRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'contacts',
    pathMatch: 'full',
  },
  {
    path: 'contacts',
    loadChildren: () =>
      import('../Contacts/contacts.routes').then((m) => m.ContactsRoutes),
  },
];
