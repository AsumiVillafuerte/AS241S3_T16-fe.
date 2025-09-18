import { ManagerFormComponent } from './feature/manager/manager-form/manager-form.component';
import { Routes } from '@angular/router';
import { MainListComponent } from './feature/main/main-list/main-list.component';
import { EmployeeListComponent } from './feature/employee/employee-list/employee-list.component';
import { CustomerListComponent } from './feature/customer/customer-list/customer-list.component';
import { RoomsListComponent } from './feature/rooms/rooms-list/rooms-list.component';
import { ReservationsListComponent } from './feature/reservations/reservations-list/reservations-list.component';
import { InvoicesListComponent } from './feature/invoices/invoices-list/invoices-list.component';
import { ConfigurationListComponent } from './feature/configuration/configuration-list/configuration-list.component';
import { CleaningListComponent } from './feature/cleaning/cleaning-list/cleaning-list.component';
import { EmployeeFormComponent } from './feature/employee/employee-form/employee-form.component';
import { RoomsFormComponent } from './feature/rooms/rooms-form/rooms-form.component';








export const routes: Routes = [
  {
    path: "Principal",
    component: MainListComponent
},


  {
    path: "Manager",
    component: ManagerFormComponent
  },


  {
    path: "Employee",
    component: EmployeeListComponent
  },


  {
    path: "Customer",
    component: CustomerListComponent
  },


  {
    path: "Rooms",
    component: RoomsListComponent
  },


  {
    path: "Reservations",
    component: ReservationsListComponent
  },


  {
    path: "Invoices",
    component: InvoicesListComponent
  },


  {
    path: "Configuration",
    component: ConfigurationListComponent
  },


  {
    path: "Cleaning",
    component: CleaningListComponent
  },


  {
    path: "new-employee",
    component: EmployeeFormComponent
  },


  {
    path: "new-rooms",
    component: RoomsFormComponent
  },


  {
    path: '',
    redirectTo: 'Principal',
    pathMatch: 'full'
  },


  { path: 'view-employee/:id', component: EmployeeFormComponent }
 
];



