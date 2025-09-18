import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rooms } from '../interfaces/rooms';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RoomService {
  deleteRoom(idRoom: any) {
    throw new Error('Method not implemented.');
  }
  createRoom(formValue: any) {
    throw new Error('Method not implemented.');
  }


  private http = inject(HttpClient);
  private urlBackEnd = `${environment.urlBackEnd}/v1/api/rooms`;


  private selectedRoomSubject = new BehaviorSubject<Rooms | null>(null);
  selectedRoom$ = this.selectedRoomSubject.asObservable();


  setSelectedRoom(room: Rooms | null): void {
    this.selectedRoomSubject.next(room);
  }


  findAll() {
    return this.http.get<Rooms[]>(this.urlBackEnd);
  }


  findById(id: number) {
    return this.http.get<Rooms>(`${this.urlBackEnd}/${id}`);
  }


  findByState(state: string) {
    return this.http.get<Rooms[]>(`${this.urlBackEnd}/state/${state}`);
  }


  save(room: Rooms) {
    return this.http.post<Rooms>(`${this.urlBackEnd}/save`, room);
  }


 update(room: Rooms) {
  return this.http.put<Rooms>(`${this.urlBackEnd}/update`, room);
}


 delete(id: number) {
  return this.http.put(`${this.urlBackEnd}/delete/${id}`, {});
}


 restore(id: number) {
  return this.http.put(`${this.urlBackEnd}/restore/${id}`, {});
}

reportPdf() {
    return this.http.get(`${this.urlBackEnd}/pdf`, { responseType: 'blob' });
  }

}

