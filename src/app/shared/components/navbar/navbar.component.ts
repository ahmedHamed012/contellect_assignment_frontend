import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AvatarModule, ButtonModule, ToastModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private readonly router: Router) {}

  public username: string = '';
  public token: string | null = localStorage.getItem('contellect_token');

  ngOnInit() {
    // Check if the token is present in local storage
    if (this.token) {
      // Decode the token to get the username
      const payload: any = jwtDecode(this.token);
      this.username = payload.username;
    } else {
      // If no token, redirect to login page
      this.router.navigate(['/auth/login']);
    }
  }

  public logout(): void {
    // Clear the token from local storage
    localStorage.removeItem('contellect_token');
    // Redirect to the login page
    this.router.navigate(['/auth/login']);
  }
}
