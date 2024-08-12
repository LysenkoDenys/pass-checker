import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-password-checker',
  templateUrl: './password-checker.component.html',
  styleUrls: ['./password-checker.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class PasswordCheckerComponent implements OnDestroy {
  passwordForm: FormGroup;
  passwordStrength: string = '';
  passwordFieldType: string = 'password';
  passwordLength: number = 0;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required]],
    });

    this.passwordForm
      .get('password')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.passwordLength = typeof value === 'string' ? value.length : 0;
        this.passwordStrength = this.calculatePasswordStrength(value);
      });
  }

  get passwordControl(): AbstractControl {
    return this.passwordForm.get('password')!;
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

  togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  resetPassword(): void {
    this.passwordForm.reset();
    this.passwordStrength = 'empty';
    this.passwordLength = 0;
    this.passwordFieldType = 'password';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
