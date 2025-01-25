import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    
    
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isSubmitted = false;
  successMessage = '';

  constructor(private fb: FormBuilder) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submitForm() {
    this.isSubmitted = true;
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.get('email')?.value;
      // Aquí iría la llamada al servicio para manejar el restablecimiento de contraseña
      console.log('Request to reset password for:', email);

      // Simulación de éxito
      this.successMessage = `An email has been sent to ${email} with password reset instructions.`;
    }
  }
}
