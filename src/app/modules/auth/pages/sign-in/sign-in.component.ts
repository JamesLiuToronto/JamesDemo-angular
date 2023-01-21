import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/modules/admin/model/User';
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

  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
  
  }

  submit() {
    this.isLoading = true;
    this.errorMessage = undefined;
    this.authService.login(this.form)
      .subscribe(u => {

        if (u.length == 0) {
          alert("Login failed" + u)
          console.log("response1" + u);
          this.errorMessage = "Login failed, email password not match";
          throw new Error(this.errorMessage);

        }
        localStorage.setItem('user', JSON.stringify(u));
        this.authService.enableAuthenticated();
        this.router.navigate(['/']);
        console.log("local=" + localStorage.getItem('user'));
        // alert(" Login successful" + this.getUserValue().firstName) ;
        return;
      }, (error) => this.errorHandler(error));
    this.isLoading = false;
  }

  private errorHandler(error: any) {
    alert("Login failed" + error.status);
    this.errorMessage = error.message;
    console.log("catch error =" + this.errorMessage);
    this.authService.disableAuthenticated();
    this.router.navigate(['login']);
    localStorage.removeItem('user');

  }


  public getUserValue(): User {
    const users: User[] = JSON.parse(localStorage.getItem('user') || '{}');
    return users[0];

  }

  logout() {
    this.authService.disableAuthenticated();
    this.router.navigate(['login']);
    localStorage.removeItem('user');

  }
}