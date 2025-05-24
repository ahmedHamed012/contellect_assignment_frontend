import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private readonly _http: HttpClient) {}

  private readonly _baseUrl = environment.api_url + '/contacts';

  public getAllContactsPaginated(
    page?: number | string,
    limit?: number | string,
    name?: string,
    phone?: string,
    address?: string
  ): Observable<any> {
    return this._http.get(`${this._baseUrl}/all`, {
      params: {
        page: page ? page.toString() : '1',
        limit: limit ? limit.toString() : '5',
        name: name ? name : '',
        phone: phone ? phone : '',
        address: address ? address : '',
      },
    });
  }
}
