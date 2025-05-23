import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // Dependencies
  constructor(private readonly fb: FormBuilder) {}

  public emptyFieldsAlert: boolean = false;
  public loginForm = this.fb.group({
    username: [''],
    password: [''],
  });

  public login(): void {
    const { username, password } = this.loginForm.value;

    if (!username || !password) {
      this.emptyFieldsAlert = true;
      return;
    }
  }
}
