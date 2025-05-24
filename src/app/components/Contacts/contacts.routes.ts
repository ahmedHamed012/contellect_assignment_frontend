import { Route } from '@angular/router';
import { AllContactsComponent } from './all-contacts/all-contacts.component';

export const ContactsRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'all-contacts',
    pathMatch: 'full',
  },
  {
    path: 'all-contacts',
    component: AllContactsComponent,
  },
];
