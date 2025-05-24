import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;
  lockedContacts$ = new BehaviorSubject<Record<string, boolean>>({});

  constructor() {
    console.log('SocketService initialized');
    console.log('Connecting to socket at:', environment.SOCKET_URL);
    this.socket = io(environment.SOCKET_URL);

    this.socket.on('contactLocked', ({ contactId }) => {
      this.setLock(contactId, true);
    });

    this.socket.on('contactUnlocked', ({ contactId }) => {
      this.setLock(contactId, false);
    });
  }

  lockContact(contactId: string) {
    this.socket.emit('lockContact', contactId);
  }

  unlockContact(contactId: string) {
    this.socket.emit('unlockContact', contactId);
  }

  private setLock(contactId: string, isLocked: boolean) {
    const current = this.lockedContacts$.getValue();
    this.lockedContacts$.next({ ...current, [contactId]: isLocked });
  }
}
