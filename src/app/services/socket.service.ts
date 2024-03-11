import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io } from 'socket.io-client';

export interface Form {
  user: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket = io('ws://localhost:8080');
  public message$ = new Subject<string>();
  public form$ = new Subject<Form>();

  constructor() {
    this.showConnection();
    this.receiveMessage();
    this.receiveForm();
    this.showDisconnection();
  }

  sendForm(form: Form) {
    this.socket.emit('message', JSON.stringify(form));
  }

  sendMessage(message: string) {
    this.socket.emit('message', message);
  }

  private receiveMessage() {
    this.socket.on('message', (message: string) => {
      this.message$.next(message);
    });
  }

  private receiveForm() {
    this.socket.on('form', (form: Form) => {
      this.form$.next(form);
    });
  }

  showConnection() {
    this.socket.on('connect', () => {
      console.log('Connected to server', this.socket.connected);
    });
  }

  showDisconnection() {
    this.socket.on('disconnect', (reason, details) => {
      console.log('Disconnected from server', reason, details);
    });
  }
}
