import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLoginHome(state.url);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin(state.url);
  }

    /**
   * Funcion para verificar si el usuario está logueado
   * @param url recibe la url de donde se hace la navegacion
   */
  checkLogin(url?: string): boolean{
    if (this.authService.isLogin) {
      return true;
    } else {
      /** si intenta acceder al main sin estar logueado lo devuelve al home */
      this.router.navigate(['/home'], { skipLocationChange: true})
      return false
    }
  }

      /**
   * Funcion para verificar si el usuario está logueado
   * @param url recibe la url de donde se hace la navegacion
   */
  checkLoginHome(url?: string): boolean{
    if (this.authService.isLogin) {
      return true;
    } else {
      console.log(url);
      if(url === '/') this.router.navigate(['/home'], { skipLocationChange: true})
      return false
    }
  }
  
}
