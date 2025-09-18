import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SlidebarComponent } from './layout/slidebar/slidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SlidebarComponent],  // Asegúrate de tener RouterOutlet
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-project';
}
