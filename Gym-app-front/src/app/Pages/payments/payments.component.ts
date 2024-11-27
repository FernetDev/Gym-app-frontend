import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AddMemberService } from '../../Services/member.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, NgIf, MatAutocompleteModule, NgFor,AsyncPipe ],
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  options = [
    { label: 'Básico', value: 1 },
    { label: 'Personalizado', value: 2 },
    { label: 'Powerlifter', value: 3 }
  ];
  
  myForm!: FormGroup;
  members: any[] = []; // Lista de miembros
  filteredMembers: Observable<any[]> = new Observable<any[]>(); // Inicializar como observable vacío
  
  constructor(private fb: FormBuilder, private memberService: AddMemberService, private snack: MatSnackBar) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      NombreCompleto: ['', [Validators.required]],
      FechaIngreso: ['', [Validators.required]],
      IdPerfil: ['', [Validators.required]],
      IdCliente: ['', []] 
    });

    this.memberService.obtenerMiembros().subscribe(members => {
      console.log('Miembros recibidos:', members);
      this.members = members;
    });

    this.filteredMembers = this.myForm.get('NombreCompleto')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.members.filter(member => {
      const isMatch = member.nombreCompleto && member.nombreCompleto.toLowerCase().includes(filterValue);
      if (isMatch) {
        this.myForm.get('IdCliente')?.setValue(member.idCliente); 
      }
      return isMatch;
    });
  }
  

  onSubmit(): void {
    if (this.myForm.valid) {
      const miembroSeleccionado = this.members.find(
        member => member.idCliente === this.myForm.value.IdCliente
      );
  
      if (!miembroSeleccionado) {
        console.error('Miembro no encontrado');
        return;
      }
  
      const updatedMember = {
        ...miembroSeleccionado, 
        estaPagada: true,
        fechaPago: new Date(this.myForm.value.FechaIngreso).toISOString(), 
        fechaVencimiento: new Date(
          new Date(this.myForm.value.FechaIngreso).setMonth(
            new Date(this.myForm.value.FechaIngreso).getMonth() + 1
          )
        ).toISOString()
      };
  
      
      this.memberService.actualizarPago(updatedMember).subscribe(
        response => {
          console.log('Miembro actualizado exitosamente', response);
          this.snack.open('Cliente registrado exitosamente.', 'Cerrar', {
            duration: 4000, 
            panelClass: ['snack-success'], 
          });
        },
        error => {
         error
        }
      );
    } else {
      console.log('Formulario inválido', this.myForm.value);
    }
  }
}  