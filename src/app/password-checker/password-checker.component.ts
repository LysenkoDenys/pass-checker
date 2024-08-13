import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PasswordCheckerService } from '../password-checker.service';
import { PasswordInputComponent } from '../password-input/password-input.component';
import { PasswordStrengthComponent } from '../password-strength/password-strength.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomCommonModule } from '../custom-common.module';

@Component({
  selector: 'app-password-checker',
  templateUrl: './password-checker.component.html',
  styleUrls: ['./password-checker.component.css'],
  standalone: true,
  imports: [
    PasswordInputComponent,
    PasswordStrengthComponent,
    ReactiveFormsModule,
    CustomCommonModule,
  ],
})
export class PasswordCheckerComponent implements OnDestroy {
  passwordForm: FormGroup;
  passwordStrength: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private passwordCheckerService: PasswordCheckerService
  ) {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required]],
    });

    this.passwordForm
      .get('password')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.passwordStrength =
          this.passwordCheckerService.calculatePasswordStrength(value);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
