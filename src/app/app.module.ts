import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PasswordCheckerModule } from './password-checker/password-checker.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    PasswordCheckerModule,
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
