// Importar Common Module, Forms Module y Angular Material
import { Component } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; 
import { PopupComponent } from '../../popup/popup.component';
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-list-member',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './list-member.component.html',
  styleUrls: ['./list-member.component.css']
})
export class ListMemberComponent {
  searchTerm: string = ''; 
  pageSize: number = 10; 
  selectedRole: string = 'all'; 
  users: any[] = []; 
  roles: string[] = ['Admin', 'Encargado', 'Miembro'];
  displayedColumns: string[] = ['name', 'role', 'actions']; // Columnas visibles en la tabla

  constructor(private dialog: MatDialog, private router : Router) {

    // Ejemplo para probar la lista de usuarios
    this.users = [
      { id: 1, name: 'Fernando Lujan', role: 'Admin', isPaid: true, paymentDate: new Date(), expiryDate: new Date() },
      { id: 2, name: 'Balta Sanchez', role: 'Encargado', isPaid: false, paymentDate: null, expiryDate: new Date() },
      { id: 3, name: 'Mati Leonel', role: 'Miembro', isPaid: true, paymentDate: new Date(), expiryDate: new Date() },
      { id: 4, name: 'Enzo Maidana', role: 'Miembro', isPaid: false, paymentDate: new Date(), expiryDate: new Date() },
      { id: 5, name: 'Lucho Ortiz', role: 'Encargado', isPaid: true, paymentDate: new Date(), expiryDate: new Date() },
    ];
  }

  // Filtrar usuarios
  getFilteredUsers() {
    return this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      user.role.toLowerCase() !== 'miembro' // Filtra el usuario Miembro y busca nombres
    );
  }

  // Abrir Popup
  openPopup(action: string, user: any): void {
    const popupData = this.getPopupData(action, user);

    const dialogRef = this.dialog.open(PopupComponent, {
      width: '400px',
      data: popupData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.executeAction(result.action, user.id);
      }
    });
  
  }
  // Información del Popup
  private getPopupData(action: string, user: any) {
    switch (action) {
      case 'edit':
        return { title: 'Edit User', message: `You want to edit ${user.name}?`, action: 'edit' };
      case 'delete':
        return { title: 'Delete User', message: `You want to delete ${user.name}?`, action: 'delete' };
      case 'resetPassword':
        return { title: 'Reset Password', message: `Reset password to ${user.name}?`, action: 'resetPassword' };
      case 'addRole':
        return { title: 'Add Role', message: `Add role to ${user.name}?`, action: 'addRole' };
      case 'removeRole':
        return { title: 'Remove Role', message: `Delete role a ${user.name}?`, action: 'removeRole' };
      default:
        return { title: 'Action', message: `Perform action for ${user.name}?`, action: 'default' };
    }
  }

  // Ejecutar acciones del popup
  private executeAction(action: string, userId: number): void {
    switch (action) {
      case 'edit':
        this.editUser(userId);
        break;
      case 'delete':
        this.deleteUser(userId);
        break;
      case 'resetPassword':
        this.resetPassword(userId);
        break;
      case 'addRole':
        this.addRole(userId);
        break;
      case 'removeRole':
        this.removeRole(userId);
        break;
      default:
        console.log('Unknown action:', action);
    }
  }

  // Métodos de acciones (ya existentes)
  editUser(userId: number) {
    console.log('Editing user:', userId);
  }

  deleteUser(userId: number) {
    console.log('Deleting user:', userId);
  }

  addRole(userId: number) {
    console.log('Adding role to user:', userId);
  }

  removeRole(userId: number) {
    console.log('Removing role from user:', userId);
  }

  resetPassword(userId: number) {
    console.log('Resetting password for user:', userId);
  }

  // Actualizar el tamaño de página
  setPageSize(size: number) {
    this.pageSize = size;
    console.log('Page size set to:', this.pageSize);
  }

  redirectToAdd(){
    this.router.navigate(['dashboard/admin/']);
  }
}
