import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddMemberService } from '../../Services/member.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  memberId!: number; 


  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,  
    private memberService: AddMemberService,    
    private router: Router                      
  ) {
    console.log(this.data.title);  
  }


  ngOnInit(): void {
    this.memberId = this.data.id; 
  }

  cancel(): void {
    this.dialogRef.close();
  }

  deleteMember(): void {
    // Llamada al servicio para eliminar el miembro
    this.memberService.deleteMember(this.memberId).subscribe({
      next: (response) => {
        console.log('Item eliminado:', response); 
        this.router.navigate(['dashboard/members']);  

        this.dialogRef.close();
      },
      error: (error) => {
        console.error('Error al eliminar el item:', error);
      },
    });
  }
}
