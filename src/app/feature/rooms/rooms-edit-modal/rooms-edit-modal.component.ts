// src/app/feature/room/rooms-edit-modal/rooms-edit-modal.component.ts
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import Swal from 'sweetalert2';
import { Rooms } from '../../../core/interfaces/rooms';

import { FormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-room-edit-modal',
  standalone: true,
  templateUrl: './rooms-edit-modal.component.html',
  styleUrls: ['./rooms-edit-modal.component.scss'],
  imports: [FormsModule]
})
export class RoomEditModalComponent implements OnChanges {
  @Input() room: Rooms | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() roomUpdated = new EventEmitter<Rooms>();

  updatedRoom: Rooms = {} as Rooms;
  currentDateTime: string = '';
  modificationDate: string = '';
  isEditMode: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['room'] && this.room) {
      this.updatedRoom = { ...this.room }; 
    }
  }

  update(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas actualizar los datos de la habitación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        this.roomUpdated.emit(this.updatedRoom);
        this.closeModal.emit();
      }
    });
  }

  cancel(): void {
    this.closeModal.emit();
  }

onDescriptionInput(event: Event): void {
  const target = event.target as HTMLElement;
  this.updatedRoom.roomDescription = target?.innerText || '';
}


ngOnInit(): void {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const localTime = new Date(now.getTime() - offset * 60000);
  this.modificationDate = localTime.toISOString().slice(0, 16); // yyyy-MM-ddTHH:mm
}

openPicker(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input && typeof (input as any).showPicker === 'function') {
    (input as any).showPicker(); // Forzar el calendario
  }
}

restoreOriginalDate(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input) {
    input.value = this.modificationDate; // Impide que cambie la fecha
  }
}

abrirCalendario(event: Event): void {
  const input = event.target as HTMLInputElement;
  input.showPicker?.(); // Forzar el despliegue del calendario (en navegadores modernos)
}

revertirFecha(event: Event): void {
  const input = event.target as HTMLInputElement;
  input.value = this.modificationDate; // Restaurar valor original
}


}