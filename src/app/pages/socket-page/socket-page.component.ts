import { Component, inject, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-socket-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './socket-page.component.html',
  styleUrl: './socket-page.component.scss',
})
export class SocketPageComponent implements OnInit {
  messages: string[] = [];
  socket = inject(SocketService);

  ngOnInit() {
    this.receiveMessage();
  }

  form = new FormGroup({
    message: new FormControl(),
  });

  sendMessage() {
    this.socket.sendForm({
      user: 'angular',
      message: this.form.value.message,
    });
    this.form.reset();
  }

  receiveMessage() {
    this.socket.message$.subscribe((message) => {
      this.messages.push(message);
    });
  }
}
