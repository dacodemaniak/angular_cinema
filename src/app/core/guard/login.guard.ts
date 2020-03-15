import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IdentityService } from '../service/identity.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  public constructor(
    public router: Router,
    private identityService: IdentityService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.identityService.isAuthenticated){
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
  
}
