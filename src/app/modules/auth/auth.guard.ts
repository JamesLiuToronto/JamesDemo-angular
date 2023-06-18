import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService : AuthService, private _router: Router){}


  canActivate() {

    
    if (this.authService.isAuthenticated()){
      return true ;
    }
    else{
      this._router.navigate(['auth/sign-in']);
      return false;  
    }
  }

  
}
