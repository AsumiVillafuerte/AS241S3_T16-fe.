import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private urlBackEnd = 'http://localhost:8085/v1/api/employee';

  constructor(private http: HttpClient) {}

  // Obtener todos los empleados
  findAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.urlBackEnd);
  }

  // Buscar empleados por estado
  findByState(state: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.urlBackEnd}/state/${state}`);
  }

  // Buscar empleado por ID
  findById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.urlBackEnd}/${id}`);
  }

  // Guardar nuevo empleado
  save(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.urlBackEnd}/save`, employee);
  }

  // Actualizar empleado
  update(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.urlBackEnd}/update`, employee);
  }

// Eliminar (lógico)
delete(id: number): Observable<any> {
  // Indicamos que la respuesta será texto
  return this.http.patch(`${this.urlBackEnd}/delete/${id}`, {}, { responseType: 'text' });
}

// Restaurar
restore(id: number): Observable<any> {
  return this.http.patch(`${this.urlBackEnd}/restore/${id}`, {}, { responseType: 'text' });
}


  reportPdf() {
    return this.http.get(`${this.urlBackEnd}/pdf`, { responseType: 'blob' });
  }

}
