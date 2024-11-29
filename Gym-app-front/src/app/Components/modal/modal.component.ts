import { Component} from '@angular/core';
import { Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { ProfileComponent } from '../../Pages/profile/profile.component';
import { AddMemberService } from '../../Services/member.service';
import { Route } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,    
    private memberService: AddMemberService,
    private route: ActivatedRoute,
    private router: Router,

  ) {
    console.log(this.data.title)
   }

   memberId!: number;  

   ngOnInit(): void {
    this.memberId = this.data.id; 
  }

  cancel(): void {
    this.dialogRef.close();  // Cierra el modal
  }

deleteMember(id: number): void {
  this.memberService.deleteMember(this.memberId).subscribe({
    next: (response) => {
      console.log('Item eliminado:', response);  // Aquí recibirás el texto plano
      this.router.navigate(['dashboard/principal']);  

      this.dialogRef.close();
    },
    error: (error) => {
      console.error('Error al eliminar el item:', error);
    },
  });
}


  

  }

