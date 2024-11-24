import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccesoService } from '../Services/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  debugger;
  const token = localStorage.getItem("token") || "";
  const router = inject(Router);


  const accesoService = inject(AccesoService)
  if(token != ""){
    return accesoService.validarToken(token).pipe(
      map(data => {
        if(data.isSuccess){
          return true
        } else{
          router.navigate([''])
          return false;
        }
      }),
      catchError(error => {
        router.navigate([''])
        return of(false);
            })
          )
        }else{
    //1 forma
    router.navigateByUrl(""); //Aca va la Url como personalice que vacio es el form de Log deje asi
    return false;
    //Otra Forma: 
    // const url = router.createUrlTree([""])
    // return url;
  }
};