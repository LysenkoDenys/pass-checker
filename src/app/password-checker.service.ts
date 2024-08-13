import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PasswordCheckerService {
  constructor() {}

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
}
