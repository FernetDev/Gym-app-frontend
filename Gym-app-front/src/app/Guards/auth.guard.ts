import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccesoService } from '../Services/auth.service';
import { catchError, map, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const accesoService = inject(AccesoService);

  // Verifica si estamos en el navegador
  if (typeof window !== 'undefined' && !!localStorage.getItem('token')) {
    const token = localStorage.getItem('token')!;

    return accesoService.validarToken(token).pipe(
      map(data => {
        if (data.isSuccess) {
          return true;
        } else {
          router.navigate(['']);
          return false;
        }
      }),
      catchError(error => {
        router.navigate(['']);
        return of(false);
      })
    );
  } else {
    // Navega al formulario de login si no hay token
    router.navigateByUrl('/login'); // Asegúrate de cambiar la ruta si es necesario
    return false;
  }
};
