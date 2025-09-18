// src/app/feature/employee/employee-edit-modal/employee-edit-modal.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { Employee } from '../../../core/interfaces/employee';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-edit-modal',
  standalone: true,
  templateUrl: './employee-edit-modal.component.html',
  styleUrls: ['./employee-edit-modal.component.scss'],
  imports: [FormsModule]
})
export class EmployeeEditModalComponent {
  @Input() employee: Employee | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() employeeUpdated = new EventEmitter<Employee>();

  updatedEmployee: Employee = {} as Employee;

  ngOnChanges(): void {
  if (this.employee) {
    this.updatedEmployee = { ...this.employee };

    const type = this.updatedEmployee.document_type;
    const maxLength = type === 'DNI' ? 8 : 20;

    // Asegurarse de que no hay espacios antes o después
    if (this.updatedEmployee.document_number) {
      this.updatedEmployee.document_number = this.updatedEmployee.document_number
        .trim()               // quitar espacios iniciales y finales
        .slice(0, maxLength); // cortar a la longitud máxima
    }
  }
}



  update(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas actualizar los datos del empleado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        this.employeeUpdated.emit(this.updatedEmployee);
        this.closeModal.emit();
      }
    });
  }

  cancel(): void {
  this.closeModal.emit();

}

nameOnlySpacesEdit: boolean = false;
surnameOnlySpacesEdit: boolean = false;
documentNumberOnlySpacesEdit: boolean = false;
invalidDocumentNumberEdit: boolean = false;

// Validar nombres
validateEditName() {
  const value = this.updatedEmployee.names;
  this.nameOnlySpacesEdit = value != null && value.trim() === '';
}

// Validar apellidos
validateEditSurname() {
  const value = this.updatedEmployee.surnames;
  this.surnameOnlySpacesEdit = value != null && value.trim() === '';
}

// Validar número de documento
validateEditDocumentNumber() {
  const value = this.updatedEmployee.document_number?.trim() || '';
  const type = this.updatedEmployee.document_type;

  this.documentNumberOnlySpacesEdit = value === '';

  this.invalidDocumentNumberEdit =
    (type === 'DNI' && value === '00000000') ||
    (type === 'CNE' && value === '00000000000000000000');
}

phoneOnlySpacesEdit: boolean = false;

validateEditPhone() {
  const phoneValue = this.updatedEmployee.phone?.trim();
  this.phoneOnlySpacesEdit = phoneValue === '';
}


}
