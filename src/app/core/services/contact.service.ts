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
   * Creates a new contact by sending a POST request to the backend API.
   *
   * @param contact - The contact object conforming to the `IContact` interface to be created.
   * @returns An `Observable<any>` that emits the server's response upon successful creation of the contact.
   */
  public createContact(contact: IContact): Observable<any> {
    return this._http.post(this._baseUrl, contact);
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
   * Deletes a contact by its unique identifier.
   *
   * @param contactId - The unique identifier of the contact to be deleted.
   * @returns An Observable that emits the server's response upon deletion.
   */
  public deleteContact(contactId: string): Observable<any> {
    return this._http.delete(`${this._baseUrl}/${contactId}`);
  }
  //-----------------------------------------------------------------------------------------------------
}
