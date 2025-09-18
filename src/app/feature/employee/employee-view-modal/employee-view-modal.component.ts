import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Employee } from '../../../core/interfaces/employee';

@Component({
  selector: 'app-employee-view-modal',
  standalone: true,
  imports: [],
  templateUrl: './employee-view-modal.component.html',
  styleUrls: ['./employee-view-modal.component.scss'],
})
export class EmployeeViewModalComponent {
  @Input() employee!: Employee;
  @Output() close = new EventEmitter();
}


