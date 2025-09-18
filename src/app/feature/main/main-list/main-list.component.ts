import { Component } from '@angular/core';

@Component({
  selector: 'app-main-list',
  standalone: true, // ← esto es crucial
  templateUrl: './main-list.component.html',
  styleUrls: ['./main-list.component.scss']
})
export class MainListComponent {
}
