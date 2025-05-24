import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactService } from '../../../core/services/contact.service';
import { MessageService } from 'primeng/api';
import { IContact } from '../../../shared/interfaces/contact.interface';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-create-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ToastModule],
  templateUrl: './create-contact.component.html',
  styleUrl: './create-contact.component.scss',
})
export class CreateContactComponent {
  constructor(
    private fb: FormBuilder,
    private readonly contactService: ContactService,
    private readonly messageService: MessageService
  ) {}

  submitted = false;
  public contactForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    address: [''],
    notes: [''],
  });
  //-----------------------------------------------------------------------------------------------------
  ngOnInit(): void {}
  //-----------------------------------------------------------------------------------------------------
  get formControls() {
    return this.contactForm.controls;
  }
  //-----------------------------------------------------------------------------------------------------
  createNewContact() {
    const newContactData = this.contactForm.value;
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }

    this.contactService.createContact(newContactData as IContact).subscribe({
      next: (response) => {
        this.contactForm.reset();
        this.submitted = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Contact Created',
          detail: response.message || 'Contact created successfully',
        });
      },
      error: (error) => {
        console.error('Error creating contact:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error?.message || 'Failed to create contact',
        });
      },
    });
  }
}
