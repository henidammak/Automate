import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    // Connecte-toi à l'URL du serveur WebSocket (ajuste l'URL de ton serveur)
    this.socket$ = new WebSocketSubject('ws//192.168.1.31:8765');
  }

  // Envoi du message (JSON pipeline)
  sendMessage(message: any): void {
    this.socket$.next(message);
  }

  // Observable pour recevoir des messages depuis le serveur
  getMessages(): Observable<any> {
    return this.socket$.asObservable();
  }

  // Fermer la connexion WebSocket proprement
  closeConnection(): void {
    this.socket$.complete();
  }
}
