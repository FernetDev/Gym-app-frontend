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
          this.myForm.patchValue({
            nombreCompleto: data.nombreCompleto,
            email: data.email,
            contactNro: data.contactNro,
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
}
