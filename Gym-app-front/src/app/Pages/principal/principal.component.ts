import { Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    MatPaginatorModule, NgFor, FormsModule, CommonModule
  ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

//Test
members = Array.from({ length: 25 }, (_, i)  =>
          ({
            name: `Member ${i + 1}`,
            state: 'Active',
            datePaid: `30/10/202${(i % 3 + 1).toString()}`,
            dateExpiry: `30/11/202${(i % 3 + 1).toString()}`,
          }));

pageSize: number = 5; // Nro de miembros por pagina
pageIndex: number = 0; // Nro de pagina inicial
searchTerm: string = ''; 

changePage(event: any) {
  this.pageIndex = event.pageIndex;
}

getFilteredMembers() {
  const filtered = this.members.filter(member =>
    member.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
  const startIndex = this.pageIndex * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  return filtered.slice(startIndex, endIndex)
}

setPageSize(value: string | undefined ): void {
  if (!value) return;
  this.pageSize = value === 'See All' ? this.members.length : parseInt(value, 10);
  this.pageIndex = 0;
}}
