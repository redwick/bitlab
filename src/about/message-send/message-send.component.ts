import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-message-send',
  standalone: true,
  imports: [],
  templateUrl: './message-send.component.html',
  styleUrl: './message-send.component.css'
})
export class MessageSendComponent {
  @Output() closed = new EventEmitter<string>();
  close() {
    this.closed.emit('close');
  }
}
