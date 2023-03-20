import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/modules/admin/services/users.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { HttpUtilityService } from 'src/app/shared/service/http-utility.service';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class ProfileMenuComponent implements OnInit {
  public isMenuOpen = false;

  constructor(private authService: AuthService, private router: Router, private usersService:UsersService,
    private httpUtilityService: HttpUtilityService ) {}

  ngOnInit(): void {}

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(){
    this.authService.logoutService();
    console.log("call logout service=" + this.authService.isAuthenticated())
    this.router.navigateByUrl('/auth/sing-in');
  }

  isAuthenticated(){
    return this.authService.isAuthenticated() ;
  }

  getUser(){
    let login = this.authService.getLoginedInUserAccount() ;
    this.getUserById(login.userId);
  }
 

  getUserById(userAccountId:number) {
    this.usersService.getUserById(userAccountId)
      .subscribe(u => {
        this.usersService.setSelectedUser(u) ;
        this.router.navigate(['//admin/user']);
      }, (error) =>  this.httpUtilityService.errorHandler("Retrieve User Failed by Id-" + userAccountId , error), ()=>{
      });
  }
}
