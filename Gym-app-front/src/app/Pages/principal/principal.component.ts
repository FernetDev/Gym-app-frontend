import { Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    MatPaginatorModule, NgFor, NgIf, FormsModule, CommonModule
  ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
setPageSize($event: any) {
throw new Error('Method not implemented.');
}

//Test
members = Array.from({ length: 25 }, (_, i)  =>
          ({
            name: `Member ${i + 1}`,
            state: 'Active',
            datePaid: `30/10/202${(i % 3 + 1).toString()}`,
            dateExpiry: `30/11/202${(i % 3 + 1).toString()}`,
          }));

pageSize: number = 10; // Nro de miembros por pagina
pageIndex: number = 0; // Nro de pagina inicial
searchTerm: string = ''; 

changePage(event: any) {
  this.pageIndex = event.pageIndex;
}

getFilteredMembers() {
  return this.members.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1 ) * this.pageSize)}
}

// setPageSize(value: string | undefined ): void {
//   if (!value) return;

//   if (value === 'See All'){
//     this.pageSize = this.members.length;
//   } else {
//     this.pageSize = parseInt(value, 10);
//   }
//   this.pageIndex = 0;
// }
