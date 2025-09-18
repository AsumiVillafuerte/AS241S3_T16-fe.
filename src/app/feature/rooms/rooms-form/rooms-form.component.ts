import {
  Component,
  inject,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { RoomService } from '../../../core/services/rooms.service';
import { Rooms } from '../../../core/interfaces/rooms'; // Ajusta la ruta según tu estructura de carpetas


@Component({
  selector: 'app-room-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './rooms-form.component.html',
  styleUrls: ['./rooms-form.component.scss'],
})
export class RoomsFormComponent implements OnInit {
  currentDateTime!: string;

  onActivate() {
    throw new Error('Method not implemented.');
  }
  private fb = inject(FormBuilder);
  private roomService = inject(RoomService);
  private router = inject(Router);


  @Input() room?: Rooms;
  @Output() saved = new EventEmitter<void>();


  form!: FormGroup;


  ngOnInit(): void {
    this.initForm();
    if (this.room) {
      this.form.patchValue({
        idRoom: this.room.idRoom,
        roomNumber: this.room.roomNumber,
        roomType: this.room.roomType,
        activityRoom: this.room.activityRoom,
        level: this.room.level,
        roomDescription: this.room.roomDescription,
        costPerDay: this.room.costPerDay,
        state: this.room.state,
      });
    }
  }


  private initForm(): void {
    this.form = this.fb.group({
      idRoom: [''],
      roomNumber: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[1-9]\d*$/)]],
      roomType: ['', Validators.required],
      activityRoom: ['', Validators.required],
      level: [
      '',
      [Validators.required, Validators.pattern(/^Piso\s+[0-9]+$/i)]
    ],
      roomDescription: ['', Validators.required], // ✅ AGREGADO
      costPerDay: [null, [Validators.required, Validators.min(50)]],
      state: ['A', Validators.required],
    });
  }
  onSave(): void {
    if (this.form.invalid) {
      this.markAllAsTouched();
      return;
    }


    Swal.fire({
      title: '¿Registrar nueva habitación?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Registrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const roomData = this.form.getRawValue();
        this.roomService.save(roomData).subscribe({
          next: () =>
            this.handleSuccess('¡Registrado!', 'Habitación creada con éxito'),
          error: (err) => {
            console.error('Error al registrar habitación:', err);
            Swal.fire({
              title: 'Error',
              text: 'No se pudo agregar esta habitación. Por favor, verifica los datos o intenta más tarde.',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          },
        });
      }
    });
  }

adjustValue(): void {
  const control = this.form.get('costPerDay');
  if (control && control.value < 50) {
    control.setValue(50);
  }
}

private markAllAsTouched(): void {
  this.form.markAllAsTouched();
}

private handleSuccess(title: string, message: string): void {
  Swal.fire({
    title: title,
    text: message,
    icon: 'success',
    confirmButtonText: 'Aceptar',
  }).then(() => {
    this.saved.emit();
    this.router.navigate(['/rooms']);
  });
}

  constructor() {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localTime = new Date(now.getTime() - offset * 60000);
    this.currentDateTime = localTime.toISOString().slice(0, 16); // yyyy-MM-ddTHH:mm
  }

  openCalendar(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.showPicker) {
      input.showPicker(); // Abrir el calendario aunque esté protegido
    }
  }

  restoreOriginalDate(event: Event) {
    // Si intentan cambiar la fecha, la restauramos
    (event.target as HTMLInputElement).value = this.currentDateTime;
  }

}
