import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-slidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './slidebar.component.html',
  styleUrl: './slidebar.component.scss'
})
export class SlidebarComponent {
  collapsed = false;

  menuItems = [
    { label: 'Panel de Control', icon: 'fa-chart-bar', route: '/dashboard' },
    { label: 'Usuarios', icon: 'fa-key', route: '/usuarios' },
    { label: 'Empleados', icon: 'fa-user-circle', route: '/empleados' },
    { label: 'Clientes', icon: 'fa-users', route: '/clientes' },
    { label: 'Habitaciones', icon: 'fa-bed', route: '/habitaciones' },
    { label: 'Reservas', icon: 'fa-calendar-alt', route: '/reservas' },
    { label: 'Facturas', icon: 'fa-dollar-sign', route: '/facturas' },
    { label: 'Comunicaciones', icon: 'fa-comment-dots', route: '/comunicaciones' },
    { label: 'Limpieza', icon: 'fa-broom', route: '/limpieza' },
    { label: 'Configuración', icon: 'fa-cog', route: '/configuracion' },
  ];

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  cerrarSesion() {
    // lógica de logout
    console.log('Sesión cerrada');
  }

  isExpanded = true;

toggleSidebar() {
  this.isExpanded = !this.isExpanded;
}

}
