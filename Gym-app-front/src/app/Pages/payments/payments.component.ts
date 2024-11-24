import { Component, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { FormBuilder,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, NgIf,MatAutocompleteModule, NgFor,MatOption],
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit{ 
  options = [
    { label: 'Básico', value: 1 },
    { label: 'Personalizado', value: 2 },
    { label: 'Powerlifter', value: 3 }
  ];
myForm! : FormGroup;

constructor(private fb: FormBuilder){}


  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      fechaIngreso: ['', [Validators.required,]],
      date: ['', [Validators.required]],
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
