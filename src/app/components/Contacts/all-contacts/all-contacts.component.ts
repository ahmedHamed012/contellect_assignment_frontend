import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { IContact } from '../../../shared/interfaces/contact.interface';
import { ContactService } from '../../../core/services/contact.service';

@Component({
  selector: 'app-all-contacts',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NavbarComponent,
    TableModule,
    PaginatorModule,
  ],
  templateUrl: './all-contacts.component.html',
  styleUrl: './all-contacts.component.scss',
})
export class AllContactsComponent {
  constructor(
    private readonly contactService: ContactService,
    private readonly fb: FormBuilder
  ) {}

  public contactsArray!: Array<IContact>;
  first: number = 0;
  rows: number = 10;
  editingContactId: string | null = null;

  contactUpdateForm = this.fb.group({
    name: [''],
    phone: [''],
    address: [''],
    notes: [''],
  });

  ngOnInit() {
    this.contactService.getAllContactsPaginated().subscribe({
      next: (response) => {
        this.contactsArray = response.data;
      },
      error: (error) => {
        console.error('Error fetching contacts:', error);
      },
    });
  }

  editContact(contact: IContact) {
    this.editingContactId = contact._id || null;
    console.log('Editing contact:', contact);
    this.contactUpdateForm.patchValue({
      name: contact.name,
      phone: contact.phone,
      address: contact.address,
      notes: contact.notes,
    });
  }

  deleteContact(contact: IContact) {}
  acceptEdit() {}
  cancelEdit() {
    this.editingContactId = null;
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
}
