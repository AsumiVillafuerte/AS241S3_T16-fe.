import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../../core/services/rooms.service';
import { Rooms } from '../../../core/interfaces/rooms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RoomEditModalComponent } from '../rooms-edit-modal/rooms-edit-modal.component';
import { RoomViewModalComponent } from '../rooms-view-modal/rooms-view-modal.component';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-rooms-list',
  standalone: true,
  imports: [
    CommonModule,
    RoomEditModalComponent,
    RoomViewModalComponent,
    FormsModule,
    RouterModule
  ],
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss']
})
export class RoomsListComponent implements OnInit {
showDropdown: boolean = false;


toggleDropdown(): void {
  this.showDropdown = !this.showDropdown;
}


applyFilter(state: string): void {
  this.dataSource = state
    ? this.rooms.filter(room => room.state === state)
    : [...this.rooms];
  this.showDropdown = false;
}


  rooms: Rooms[] = [];
  dataSource: Rooms[] = [];
  searchTerm: string = '';
  selectedRoom: Rooms | null = null;
  showEditModal: boolean = false;
  showViewModal: boolean = false;


  constructor(
    private roomService: RoomService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.loadRooms();
  }


filterRooms(): void {
  const term = this.searchTerm.trim().toLowerCase();


this.dataSource = this.rooms.filter(room => {
  const roomNumberMatch = room.roomNumber?.toString().toLowerCase().includes(term);
  const roomTypeMatch = room.roomType?.toLowerCase().includes(term);
  const activityRoomMatch = room.activityRoom?.toLowerCase().includes(term);
  const levelMatch = room.level?.toLowerCase().includes(term);
  const registrationDateMatch = room.registrationDate?.toLowerCase().includes(term);
  const costPerDayMatch = room.costPerDay?.toString().toLowerCase().includes(term); // <-- agregado
const roomDescriptionMatch = room.roomDescription?.toLowerCase().includes(term);

  return roomNumberMatch || roomTypeMatch || activityRoomMatch || levelMatch || registrationDateMatch || costPerDayMatch || roomDescriptionMatch;
});

}


  editRoom(id: number): void {
    const room = this.dataSource.find(r => r.idRoom === id);
    if (room) {
      this.selectedRoom = { ...room };
      this.showEditModal = true;
    }
  }


  onRoomUpdated(updated: Rooms): void {
  if (updated.idRoom != null) {
    this.roomService.update(updated).subscribe({
      next: () => {
        this.loadRooms();
        this.showEditModal = false;
        this.selectedRoom = null;
      },
      error: err => console.error('Error actualizando habitación:', err)
    });
  } else {
    console.error('El idRoom es requerido para actualizar la habitación');
  }
}


  cancelEdit(): void {
    this.showEditModal = false;
    this.selectedRoom = null;
  }




deleteRoom(id: number): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción marcará la habitación como inactiva.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.roomService.delete(id).subscribe({
        next: () => {
          this.loadRooms(); // o actualiza la lista manualmente
          Swal.fire('Eliminado', 'La habitación fue marcada como inactiva.', 'success');
        },
        error: err => {
          console.error('Error al eliminar habitación:', err);
          Swal.fire('Error', 'No se pudo eliminar la habitación.', 'error');
        }
      });
    }
  });
}




restoreRoom(id: number): void {
  Swal.fire({
    title: '¿Restaurar habitación?',
    text: 'Esta acción volverá a activar la habitación.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, restaurar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.roomService.restore(id).subscribe({
        next: () => {
          this.loadRooms();
          Swal.fire('¡Restaurada!', 'La habitación ha sido activada.', 'success');
        },
        error: (err) => {
          console.error('Error al restaurar habitación:', err);
          Swal.fire('Error', 'No se pudo restaurar la habitación.', 'error');
        }
      });
    }
  });
}




  viewRoom(id: number): void {
    const room = this.dataSource.find(r => r.idRoom === id);
    if (room) {
      this.selectedRoom = { ...room };
      this.showViewModal = true;
    }
  }


  cancelView(): void {
    this.showViewModal = false;
    this.selectedRoom = null;
  }


  goRoomForm(id: number): void {
    this.router.navigate(['/view-room', id]);
  }






//fILTRO POR PAGINA
roomsPerPage: number = 10;
currentPage: number = 1;
totalPages: number = 1;


loadRooms(): void {
  this.roomService.findAll().subscribe({
    next: (data) => {
      this.rooms = data;
      this.totalPages = Math.ceil(this.rooms.length / this.roomsPerPage);
      this.updateDataSource();
    },
    error: (err) => console.error('Error al cargar habitaciones:', err)
  });
}


updateDataSource(): void {
  const startIndex = (this.currentPage - 1) * this.roomsPerPage;
  const endIndex = startIndex + this.roomsPerPage;
  this.dataSource = this.rooms.slice(startIndex, endIndex);
}


goToPrevious(): void {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.updateDataSource();
  }
}


goToNext(): void {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.updateDataSource();
  }
}


reportPdf() {
    this.roomService.reportPdf().subscribe(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'reporte.pdf'; // nombre temporal
      link.click();
      URL.revokeObjectURL(url);
    });
  }

 
}
