// Cambiar el nombre de la clase de EmployeeViewModalComponent a RoomViewModalComponent
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Rooms } from '../../../core/interfaces/rooms';

@Component({
  selector: 'app-room-view-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rooms-view-modal.component.html',
  styleUrls: ['./rooms-view-modal.component.scss'],
})
export class RoomViewModalComponent {  // Asegúrate de que el nombre de la clase sea RoomViewModalComponent
  @Input() room!: Rooms;
  @Output() close = new EventEmitter<void>();

  
}