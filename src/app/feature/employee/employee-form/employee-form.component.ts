import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../core/interfaces/employee';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class EmployeeFormComponent {
 employee: Omit<Employee, 'id_employee'> = {
    names: '',
    surnames: '',
    phone: '',
    document_type: '',
    document_number: '',
    shift: '',
    state: 'A',
  };

  loading: boolean = false;

  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  onSubmit(form: any): void {
  if (form.invalid) {
    form.control.markAllAsTouched();
    Swal.fire('Faltan datos', 'Completa todos los campos obligatorios.', 'warning');
    return;
  }

  this.loading = true;

  this.employeeService.save(this.employee).subscribe({
    next: () => {
      this.loading = false;
      Swal.fire('Éxito', 'Empleado guardado correctamente.', 'success').then(() => {
        this.router.navigate(['/Employee']);
      });
    },

    error: (err) => {
      this.loading = false;
      console.error('Error al guardar empleado:', err);
      Swal.fire('Error', 'No se pudo guardar el empleado. Inténtalo más tarde.', 'error');
    }
  });
}


nameOnlySpaces: boolean = false;

validateName() {
  const value = this.employee.names;
  this.nameOnlySpaces = value != null && value.trim() === '';
}

surnameOnlySpaces: boolean = false;

validateSurname() {
  const value = this.employee.surnames;
  this.surnameOnlySpaces = value != null && value.trim() === '';
}

documentNumberOnlySpaces = false;
invalidDocumentNumber = false;

validateDocumentNumber() {
  const value = this.employee.document_number?.trim() || '';
  const type = this.employee.document_type;

  this.documentNumberOnlySpaces = value === '';
  this.invalidDocumentNumber =
    (type === 'DNI' && value === '00000000') ||
    (type === 'CNE' && value === '00000000000000000000');
}

phoneOnlySpaces: boolean = false;

validatePhone() {
  const value = this.employee.phone;
  this.phoneOnlySpaces = value != null && value.trim() === '';
}

}
