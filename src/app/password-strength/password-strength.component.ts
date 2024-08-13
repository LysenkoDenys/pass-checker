import { Component, Input } from '@angular/core';
import { PasswordCheckerService } from '../password-checker.service';
import { CustomCommonModule } from '../custom-common.module';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.css'],
  standalone: true,
  imports: [CustomCommonModule],
})
export class PasswordStrengthComponent {
  @Input() passwordStrength: string = '';

  constructor(private passwordCheckerService: PasswordCheckerService) {}

  getStrengthClass(section: number): string {
    if (this.passwordStrength === 'empty') {
      return 'gray';
    }
    if (this.passwordStrength === 'too-short') {
      return 'red';
    }
    if (this.passwordStrength === 'easy' && section === 1) {
      return 'red';
    }
    if (
      this.passwordStrength === 'medium' &&
      (section === 1 || section === 2)
    ) {
      return 'yellow';
    }
    if (this.passwordStrength === 'strong') {
      return 'green';
    }
    return 'gray';
  }
}
