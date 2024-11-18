import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder,FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register',
  standalone: true,
  imports:  [ReactiveFormsModule,
     MatFormFieldModule,
     MatInputModule,
     MatDatepickerModule,
     MatNativeDateModule,
     MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  myForm! : FormGroup;

constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required,Validators.pattern('^[0-9]*$')]],
      dateOfJoin: ['', [Validators.required]],
      contactNo: ['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]], 
    }, );
  }

  onSubmit(){
    if(this.myForm.valid){
      console.log("Form submited", this.myForm.value);
    }else{
      console.log("invalid", this.myForm.value);
    }
  }

  
}
