import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // Dependencies
  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService
  ) {}

  public emptyFieldsAlert: boolean = false;
  public loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  public login(): void {
    const { username, password } = this.loginForm.value;

    if (!username || !password) {
      this.emptyFieldsAlert = true;
      return;
    }

    this.authService.login(username, password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
      },
      error: (error) => {
        console.error('Login failed', error);
      },
    });
  }
}
