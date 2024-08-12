import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordCheckerComponent } from './password-checker.component';

@NgModule({
  declarations: [PasswordCheckerComponent],
  imports: [CommonModule],
  exports: [PasswordCheckerComponent],
})
export class PasswordCheckerModule {}
