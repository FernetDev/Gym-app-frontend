import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  debugger;
  if(req.url.indexOf("Acceso") > 0) return next(req);
  // Toda solicitud que no sea Acceso se le pasa BEARER TOKEN
  const token = localStorage.getItem("token");
  const cloneRequest = req.clone({
    setHeaders:{
      Autorization: `Bearer ${token}`
    }
  })
  return next(cloneRequest); //ejecutar ahora el clone que tiene la auth del token


};