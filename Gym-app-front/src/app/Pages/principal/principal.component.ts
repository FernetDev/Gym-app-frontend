import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgFor, NgIf, CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddMemberService } from '../../Services/member.service';
import { Miembro } from '../../Interfaces/miembro';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [MatPaginatorModule, NgFor, FormsModule, CommonModule],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
  members: Miembro[] = []; 
  pageSize: number = 5; 
  pageIndex: number = 0; 
  searchTerm: string = '';
  
  constructor(private memberService: AddMemberService, private router : Router) {}

  ngOnInit(): void {
    this.loadMembers();
  }
  loadMembers(): void {
    this.memberService.listarMiembros().subscribe(
      (data: Miembro[]) => {
        this.members = data;
          const fechaActual = new Date();
          
          this.members.forEach(member => {
            const vencimiento = new Date(member.fechaVencimiento); 
            if (fechaActual > vencimiento) {
              member.estaPagada = false;  
            }
          });
        
        console.log('Miembros cargados:', this.members);
      },
      (error) => {
        console.error('Error al cargar miembros:', error);
      }
    );
  }


  changePage(event: any) {
    this.pageIndex = event.pageIndex; 
  }

  getFilteredMembers() {
    const filtered = this.members.filter(member =>
      member.nombreCompleto && member.nombreCompleto.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return filtered.slice(startIndex, endIndex);
  }
  
  setPageSize(value: string | undefined): void {
    if (!value) return;
    this.pageSize = value === 'See All' ? this.members.length : parseInt(value, 10);
    this.pageIndex = 0;
  
  }


  verPerfil(memberId: number): void {
    this.router.navigate(['dashboard/profile/', memberId]);
  }


} 