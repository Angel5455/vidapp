import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import {AngularFireAuth } from '@angular/fire/auth';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SeguridadGuard implements CanActivate {
  constructor( private router: Router,
               private afAuth: AngularFireAuth,
               private authService: AuthService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.afAuth.authState
      .take(1)
      .map(authState => !! authState)
      .do( authenticated => {
         if (!authenticated) {
           this.router.navigate(['/login']);
         }
      });
  }
}
