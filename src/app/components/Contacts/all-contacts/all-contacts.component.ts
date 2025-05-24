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
import { SocketService } from '../../../core/services/socket.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
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
    DialogModule,
  ],
  templateUrl: './all-contacts.component.html',
  styleUrl: './all-contacts.component.scss',
})
export class AllContactsComponent {
  constructor(
    private readonly contactService: ContactService,
    private readonly fb: FormBuilder,
    private readonly messageService: MessageService,
    private readonly socketService: SocketService
  ) {}

  public contactsArray!: Array<IContact>;
  first: number = 0;
  rows: number = 5;
  editingContactId: string | null = null;
  lockedContacts: Record<string, boolean> = {};
  contactsCount: number | string = 0;
  deletePopUpAlertState: boolean = false;
  deletedContactData: any = {};
  contactUpdateForm = this.fb.group({
    name: [''],
    phone: [''],
    address: [''],
    notes: [''],
  });
  //----------------------------------------------------------------------------------------------------

  ngOnInit() {
    this.socketService.lockedContacts$.subscribe((locks) => {
      this.lockedContacts = locks;
    });
    this.contactService.getAllContactsPaginated().subscribe({
      next: (response) => {
        const { total, data } = response;
        this.contactsArray = data;
        this.contactsCount = total;
      },
      error: (error) => {
        console.error('Error fetching contacts:', error);
      },
    });
  }
  //----------------------------------------------------------------------------------------------------

  editContact(contact: IContact) {
    if (this.lockedContacts[contact._id ?? '']) {
      alert('This contact is being edited by another user.');
      return;
    }
    this.editingContactId = contact._id ?? null;
    this.socketService.lockContact(contact._id ?? '');

    this.contactUpdateForm.patchValue({
      name: contact.name,
      phone: contact.phone,
      address: contact.address,
      notes: contact.notes,
    });
  }
  //----------------------------------------------------------------------------------------------------

  deleteContact(contactId: string) {
    if (this.lockedContacts[contactId]) {
      alert('This contact is being edited by another user.');
      return;
    }
    console.log('Deleting contact:', contactId);
    this.contactService.deleteContact(contactId).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Contact Deleted',
          detail: response.message || 'Contact deleted successfully',
        });
        this.deletePopUpAlertState = false;
        this.deletedContactData['name'] = '';
        this.ngOnInit();
      },
      error: (error) => {
        console.error('Error deleting contact:', error);
      },
    });
  }
  //----------------------------------------------------------------------------------------------------

  acceptEdit() {
    const formValue = this.contactUpdateForm.value;

    if (this.editingContactId) {
      const updatedContact: IContact = {
        _id: this.editingContactId ?? '',
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
            detail: response.message || 'Contact updated successfully',
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
  //----------------------------------------------------------------------------------------------------
  cancelEdit() {
    if (this.editingContactId) {
      this.socketService.unlockContact(this.editingContactId);
      this.editingContactId = null;
    }
  }
  //----------------------------------------------------------------------------------------------------
  popUpDeleteAlert(contactName: string, contactId: string) {
    this.deletePopUpAlertState = true;
    this.deletedContactData['name'] = contactName;
    this.deletedContactData['contactId'] = contactId;
  }
  //----------------------------------------------------------------------------------------------------

  onPageChange(event: any) {
    const pageNumber = event.page + 1;
    this.first = event.first;
    this.rows = event.rows;

    this.contactService.getAllContactsPaginated(pageNumber).subscribe({
      next: (response) => {
        const { total, data } = response;
        this.contactsArray = data;
        this.contactsCount = total;
      },
      error: (error) => {
        console.error('Error fetching contacts:', error);
      },
    });
  }
}
