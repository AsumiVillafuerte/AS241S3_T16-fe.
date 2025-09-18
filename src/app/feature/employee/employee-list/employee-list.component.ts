
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../../core/interfaces/employee';
import { EmployeeService } from '../../../core/services/employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { RouterModule } from '@angular/router';
import { EmployeeEditModalComponent } from '../employee-edit-modal/employee-edit-modal.component';
import { EmployeeViewModalComponent } from '../employee-view-modal/employee-view-modal.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  standalone: true,
  imports:[CommonModule, FormsModule, RouterModule,EmployeeEditModalComponent ,EmployeeViewModalComponent],
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  dataSource: Employee[] = [];
  searchTerm: string = '';

    selectedEmployee: Employee | null = null;
  showEditModal: boolean = false;
  constructor(
    private EmployeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

loadEmployees(): void {
  this.EmployeeService.findAll().subscribe({
    next: (data) => {
      const sortedData = data.sort((a, b) => 
        (b.id_employee ?? 0) - (a.id_employee ?? 0) // Usa 0 si algún id es undefined
      );
      this.employees = sortedData;
      this.dataSource = [...sortedData];
    },
    error: (err) => console.error('Error al obtener empleados', err)
  });
}






filterEmployees(): void {
  const term = this.searchTerm.trim().toLowerCase();

  this.dataSource = this.employees.filter(emp => {
    // Convertir estado a minúsculas para comparación
    const estadoTexto = emp.state === 'A' ? 'activo' : (emp.state === 'I' ? 'inactivo' : '');

    // Si el término es "activo" o "inactivo", filtrar por estado exacto
    if (term === 'activo' || term === 'inactivo') {
      return estadoTexto === term;
    }

    // Búsqueda normal en otros campos
    return (
      (emp.names?.toLowerCase().includes(term) ?? false) ||
      (emp.surnames?.toLowerCase().includes(term) ?? false) ||
      (emp.document_number?.includes(term) ?? false) ||
      estadoTexto.includes(term) ||
      (emp.shift?.toLowerCase().includes(term) ?? false) ||
      (emp.document_type?.toLowerCase().includes(term) ?? false) ||
      (emp.phone?.includes(term) ?? false)
    );
  });
  this.currentPage = 1;

}



  editEmployee(id: number): void {
    const emp = this.dataSource.find(e => e.id_employee === id);
    if (emp) {
      this.selectedEmployee = { ...emp }; // copia para evitar edición directa
      this.showEditModal = true;
    }
  }

onEmployeeUpdated(updated: Employee): void {
    this.EmployeeService.update(updated).subscribe({
      next: () => {
        this.loadEmployees();
        this.showEditModal = false;
        this.selectedEmployee = null;
      },
      error: err => console.error('Error actualizando empleado', err)
    });
  }

  cancelEdit(): void {
    this.showEditModal = false;
    this.selectedEmployee = null;
  }

deleteEmployee(id: number): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Deseas inhabilitar al empleado?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, inhabilitar',
    cancelButtonText: 'Cancelar'
  }).then(result => {
    if (result.isConfirmed) {
      this.EmployeeService.delete(id).subscribe({
        next: () => {
          const emp = this.dataSource.find(e => e.id_employee === id);
          if (emp) emp.state = 'I'; // Actualiza localmente
          Swal.fire('Empleado inhabilitado', '', 'success'); // Solo mostrar alerta después
        },
        error: err => {
          console.error('Error eliminando empleado', err);
          Swal.fire('Error', 'No se pudo inhabilitar el empleado', 'error');
        }
      });
    }
  });
}

restoreEmployee(id: number, event?: Event): void {
  if (event) event.preventDefault();
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Deseas habilitar al empleado?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, habilitar',
    cancelButtonText: 'Cancelar'
  }).then(result => {
    if (result.isConfirmed) {
      this.EmployeeService.restore(id).subscribe({
        next: () => {
          const emp = this.dataSource.find(e => e.id_employee === id);
          if (emp) emp.state = 'A'; // Actualiza localmente
          Swal.fire('Empleado habilitado', '', 'success'); // Mostrar alerta después
        },
        error: err => {
          console.error('Error al restaurar empleado', err);
          Swal.fire('Error', 'No se pudo habilitar el empleado', 'error');
        }
      });
    }
  });
}


  // ✅ Nueva función para redireccionar a la vista detallada del empleado
  goEmployeeForm(id: number): void {
    this.router.navigate(['/view-employee', id]);
  }

  showViewModal = false;
    viewEmployee(id: number): void {
    const emp = this.dataSource.find(e => e.id_employee === id);
    if (emp) {
      this.selectedEmployee = { ...emp };
      this.showViewModal = true;
    }
  }

  cancelView(): void {
    this.showViewModal = false;
    this.selectedEmployee = null;
  }

 showFilterDropdown = false;
selectedFilterState: 'Todos' | 'Activo' | 'Inactivo' = 'Todos';

toggleFilterDropdown(): void {
  this.showFilterDropdown = !this.showFilterDropdown;
}

filterByState(state: 'Todos' | 'Activo' | 'Inactivo'): void {
  this.selectedFilterState = state;
  this.showFilterDropdown = false;

  this.dataSource = state === 'Todos'
    ? [...this.employees]
    : this.employees.filter(e => e.state === (state === 'Activo' ? 'A' : 'I'));
    this.currentPage = 1;

}
currentPage: number = 1;
pageSize: number = 10; // puedes ajustar este número según lo que quieras mostrar por página
get totalPages(): number {
  return Math.ceil(this.dataSource.length / this.pageSize);
}

previousPage(): void {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}

nextPage(): void {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
  }
}

reportPdf() {
    this.EmployeeService.reportPdf().subscribe(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'reporte.pdf'; // nombre temporal
      link.click();
      URL.revokeObjectURL(url);
    });
  }



}

