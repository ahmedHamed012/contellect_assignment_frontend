import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly _http: HttpClient) {}

  private readonly _baseUrl = environment.api_url + '/auth';

  public login(username: string, password: string): Observable<any> {
    return this._http.post(`${this._baseUrl}/login`, { username, password });
  }
}
