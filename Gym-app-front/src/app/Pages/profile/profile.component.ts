import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddMemberService } from '../../Services/member.service';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Miembro } from '../../Interfaces/miembro';
import { Title } from '@angular/platform-browser';  


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  memberId!: number;
  myForm: FormGroup; 
  memberData: any = {}; 


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private memberService: AddMemberService
  ) {
    this.myForm = this.fb.group({
      nombreCompleto: ['', Validators.required],  
      email: ['', [Validators.required, Validators.email]],
      contactNro: ['', Validators.required],
      idCliente: [''],
      idPerfil: [''],
      estaPagada: [''],
      fechaPago: [''],
      fechaVencimiento: [''],
      fechaIngreso: [''],
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
          const perfilDescripcion = this.getPerfilDescripcion(data.idPerfil);
          this.myForm.patchValue({
            nombreCompleto: data.nombreCompleto,
            email: data.email,
            contactNro: data.contactNro,
            fechaVencimiento: data.fechaVencimiento.split('T')[0],
            fechaIngreso: data.fechaIngreso.split('T')[0],
            fechaPago: data.fechaPago.split('T')[0],
            idPerfil: perfilDescripcion, // Aquí usamos la descripción en lugar del número

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

  getPerfilDescripcion(idPerfil: number): string {
    switch (idPerfil) {
      case 1:
        return 'Básico';
      case 2:
        return 'Personalizado';
      case 3:
        return 'Powerlifter';
      default:
        return 'Desconocido';
    }
  }
}
