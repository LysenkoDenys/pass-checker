import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-checker',
  templateUrl: './password-checker.component.html',
  styleUrls: ['./password-checker.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class PasswordCheckerComponent {
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      password: [
        '',
        [Validators.required, Validators.minLength(8), this.passwordValidator],
      ],
    });
  }

  get passwordControl(): AbstractControl {
    return this.passwordForm.get('password')!;
  }

  onSubmit(): void {
    if (this.passwordForm.valid) {
      alert('Пароль відповідає вимогам!');
    }
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const errors: any = {};

    if (!/[A-Z]/.test(value)) {
      errors.uppercase = true;
    }
    if (!/[a-z]/.test(value)) {
      errors.lowercase = true;
    }
    if (!/[0-9]/.test(value)) {
      errors.number = true;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      errors.specialCharacter = true;
    }

    return Object.keys(errors).length ? errors : null;
  }
}
