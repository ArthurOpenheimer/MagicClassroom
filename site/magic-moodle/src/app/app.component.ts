import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'magic-moodle';
  display:boolean=true

  changePage() {
    this.display = false
    this.router.navigate(['/login-component'])
  }

  constructor(private router: Router) {}
}
