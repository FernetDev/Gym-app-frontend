import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder,Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  myForm! : FormGroup;

  constructor(private fb: FormBuilder){}
  
    ngOnInit(): void {
      this.myForm = this.fb.group({
        name: ['', [Validators.required]],
        password: ['', [Validators.required,]],
        email: ['', [Validators.required]],
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
