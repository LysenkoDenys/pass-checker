import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { PasswordInputComponent } from '../password-input/password-input.component';
import { PasswordStrengthComponent } from '../password-strength/password-strength.component';

@Component({
  selector: 'app-password-checker',
  standalone: true,
  templateUrl: './password-checker.component.html',
  styleUrls: ['./password-checker.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PasswordInputComponent,
    PasswordStrengthComponent,
  ],
})
export class PasswordCheckerComponent implements OnDestroy {
  passwordForm: FormGroup;
  passwordStrength: string = 'empty';
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required]],
    });

    this.passwordForm
      .get('password')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.passwordStrength = this.calculatePasswordStrength(value);
      });
  }

  calculatePasswordStrength(password: string): string {
    if (!password) {
      return 'empty';
    }
    if (password.length < 8) {
      return 'too-short';
    }
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasDigits = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (hasLetters && hasDigits && hasSymbols) {
      return 'strong';
    }
    if (
      (hasLetters && hasDigits) ||
      (hasLetters && hasSymbols) ||
      (hasDigits && hasSymbols)
    ) {
      return 'medium';
    }
    return 'easy';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
