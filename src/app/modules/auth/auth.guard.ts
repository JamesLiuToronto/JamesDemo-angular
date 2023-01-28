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
      console.log("canActivate true= " + this.authService.isAuthenticated()) ;
      return true ;
    }
    else{
      console.log("canActivate= false" + this.authService.isAuthenticated()) ;
      this._router.navigate(['auth/sign-in']);
      return false;  
    }
  }

  
}
