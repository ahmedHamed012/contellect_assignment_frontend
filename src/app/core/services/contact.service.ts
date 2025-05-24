import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IContact } from '../../shared/interfaces/contact.interface';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private readonly _http: HttpClient) {}

  private readonly _baseUrl = environment.api_url + '/contacts';

  /**
   * Updates a contact by id on the server.
   *
   * @param {IContact} updatedContact - The contact to update.
   * @returns {Observable<any>} An observable containing the updated contact.
   */
  public updateContact(updatedContact: IContact): Observable<any> {
    return this._http.patch(
      `${this._baseUrl}/${updatedContact._id}`,
      updatedContact
    );
  }

  //-----------------------------------------------------------------------------------------------------
  /**
   * Retrieves a paginated list of contacts from the server.
   *
   * @param {number | string} [page] - The page number to retrieve, defaults to '1'.
   * @param {number | string} [limit] - The number of contacts per page, defaults to '5'.
   * @param {string} [name] - Optional filter for contact name.
   * @param {string} [phone] - Optional filter for contact phone.
   * @param {string} [address] - Optional filter for contact address.
   * @returns {Observable<any>} An observable containing the paginated list of contacts.
   */

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
  //-----------------------------------------------------------------------------------------------------
  public deleteContact(contactId: string): Observable<any> {
    return this._http.delete(`${this._baseUrl}/${contactId}`);
  }
}
