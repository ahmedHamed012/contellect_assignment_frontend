import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { IContact } from '../../../shared/interfaces/contact.interface';
import { ContactService } from '../../../core/services/contact.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
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
    ToastModule,
    SelectModule,
    TagModule,
    IconFieldModule,
    InputTextModule,
    InputIconModule,
    MultiSelectModule,
  ],
  templateUrl: './all-contacts.component.html',
  styleUrl: './all-contacts.component.scss',
})
export class AllContactsComponent {
  constructor(
    private readonly contactService: ContactService,
    private readonly fb: FormBuilder,
    private readonly messageService: MessageService
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

    this.contactUpdateForm.patchValue({
      name: contact.name,
      phone: contact.phone,
      address: contact.address,
      notes: contact.notes,
    });
  }

  deleteContact(contact: IContact) {}
  acceptEdit() {
    const formValue = this.contactUpdateForm.value;

    if (this.editingContactId) {
      const updatedContact: IContact = {
        _id: this.editingContactId,
        name: formValue.name ?? '',
        phone: formValue.phone ?? '',
        address: formValue.address ?? '',
        notes: formValue.notes ?? '',
      };

      this.contactService.updateContact(updatedContact).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Contact Updated',
            detail: 'The contact has been successfully updated.',
          });
          this.ngOnInit(); // Refresh the contact list
          this.cancelEdit();
        },
        error: (error) => {
          console.error('Error updating contact:', error);
        },
      });
    }
  }
  cancelEdit() {
    this.editingContactId = null;
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
}
