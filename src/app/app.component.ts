import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PasswordCheckerComponent } from './password-checker.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PasswordCheckerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'check-pass';
}
