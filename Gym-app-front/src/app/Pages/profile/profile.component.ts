import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddMemberService } from '../../Services/member.service';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { ModalComponent } from '../../Components/modal/modal.component'; 
import { MatDialog } from '@angular/material/dialog';
import { NgFor } from '@angular/common';
import { MatAutocomplete, MatAutocompleteModule, MatOption } from '@angular/material/autocomplete';



@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,NgFor, MatAutocomplete,MatOption,MatAutocompleteModule, ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  memberId!: number;
  myForm: FormGroup; 
  memberData: any = {}; 
  options = [
    { label: 'Básico', value: 1 },
    { label: 'Personalizado', value: 2 },
    { label: 'Powerlifter', value: 3 }
  ];


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private memberService: AddMemberService,
    private matDialog : MatDialog
  ) {
    this.myForm = this.fb.group({
      nombreCompleto: ['', Validators.required],  
      email: ['', [Validators.required, Validators.email]],
      contactNro: ['', Validators.required],
      idCliente: [''],
      idPerfil: ['', Validators.required],
      estaPagada: [''],
      fechaPago: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],
      fechaIngreso: ['', Validators.required],
    });
  }

  

  
  ngOnInit(): void {
    this.memberId = +this.route.snapshot.paramMap.get('id')!;
    this.loadMemberData(this.memberId);
  }

  

  loadMemberData(id: number): void {

    this.memberService.obtenerMiembroId(id).subscribe(
      (data) => {
        if (data) {
          this.memberData = data
          const perfil = this.options.find(option => option.value === this.memberData.idPerfil);
          const idPerfilLabel = perfil ? perfil.label : ''; 
          this.myForm.patchValue({
            nombreCompleto: data.nombreCompleto,
            email: data.email,
            contactNro: data.contactNro,
            fechaVencimiento: data.fechaVencimiento.split('T')[0],
            fechaIngreso: data.fechaIngreso.split('T')[0],
            fechaPago: data.fechaPago.split('T')[0],
            idPerfil: idPerfilLabel 


          });
        } else {
          console.error('No se encontró un miembro con el ID:', id);
        }
      },
      (error) => {
        console.error('Error al obtener los datos del miembro:', error);
      }
    );
  }


  onSubmit(){
    const selectedOption = this.options.find(option => option.label === this.myForm.value.idPerfil);
    const idPerfilValue = selectedOption ? selectedOption.value : null;
    
    const updatedMember = {
      ...this.memberData,
      nombreCompleto: this.myForm.value.nombreCompleto,
      contactNro: this.myForm.value.contactNro, 
      email: this.myForm.value.email, 
      idPerfil: idPerfilValue,
      estaPagada: true,
      fechaPago: this.myForm.value.fechaPago,
      fechaVencimiento: this.myForm.value.fechaVencimiento,
      fechaIngreso: this.myForm.value.fechaIngreso
    };

    console.log(updatedMember);  // Verifica en consola el objeto que estás enviando

    this.memberService.actualizarPago(updatedMember).subscribe(
      response => {
        console.log('Miembro actualizado exitosamente', response);
      },
      error => {
      error
      }
    );
  } 

  deleteMember(id: number): void {
    this.memberService.deleteMember(id).subscribe({
      next: (response) => {
        console.log('Item eliminado:', response);
      },
      error: (error) => {
        console.error('Error al eliminar el item:', error);
      },
    });
  }


openModal(): void {
  this.matDialog.open(ModalComponent, {
    width: '80%',  // O puedes usar 'auto' si prefieres que se ajuste al contenido
    maxWidth: '500px', // Esto limita el ancho máximo
    height: 'auto',  // Permite que la altura se ajuste según el contenido
    data: {
      title: 'DELETE MEMBER', // Puedes agregar el título aquí directamente
      id: this.memberId
    },
  });
}

}
