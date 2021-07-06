import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loginStatusSelector } from '../../store/auth/auth.reducer';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
  isLoggedIn: boolean;
  constructor(private route: Router, private store: Store) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    this.store.select(loginStatusSelector).subscribe(data => this.isLoggedIn = data);
    if(this.isLoggedIn){
      return true
    }
    this.route.navigate(['/auth/login']);
    return false
  }
}
