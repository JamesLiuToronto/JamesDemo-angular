import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginForm } from '../../model/Auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  isLoading: boolean = false;
  errorMessage: string | undefined;;

  form: LoginForm = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router, private routes: ActivatedRoute) {
     }
  ngOnInit(): void {
  
  }

  submit() {
    this.isLoading = true;
    this.errorMessage = undefined;
    this.isLoading = true;
    let ret = this.authService.login(this.form);
    console.log("return true") ;
    if (ret){
      console.log("return true" + this.authService.isAuthenticated) ;
      this.router.navigate(['/dashboard/nfts'], {relativeTo: this.routes});

    }
    else{
      this.logout() ;
    }

    this.isLoading = false;
  }
 
  logout() {
    this.authService.logout() ;
    this.router.navigate(['/auth/sign-in']);
  }

  goHome(){
    this.router.navigate(['/auth/sign-in']);
  }
  
}