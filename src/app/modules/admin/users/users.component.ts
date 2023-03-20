import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { HttpUtilityService } from 'src/app/shared/service/http-utility.service';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../model/User';
import { UsersService } from '../services/users.service';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit  {

  users: User[] = [];
  lastRetrieveTime: Date | undefined ;
  loading$ = this.loader.loading$ ;
  title:string = "Retrieve User List" ;
  

  constructor(public loader: LoadingService, private usersService: UsersService, 
    private router: Router, private httpUtilityService: HttpUtilityService, private authService: AuthService) { 
  }
  ngOnInit(): void {

    if (this.users.length == 0){
     this.getUserList() ; 
      console.log("INIT retrirvr") ;
    }

        
  }
    
  getUserList() {
    let account = this.authService.getLoginedInUserAccount() ;
    if (account.roleList.includes("ADMIN")){
      this.getUsers() ;
    } else{
      this.getUserById(account.userId);
    }

        
  }

  getUserById(userAccountId:number) {
    this.usersService.getUserById(userAccountId)
      .subscribe(u => {
        this.users.push(u) ;
        this.lastRetrieveTime = new Date() ;
      }, (error) =>  this.httpUtilityService.errorHandler("Retrieve User Failed by Id-" + userAccountId , error), ()=>{
       console.log("loading flag finish=" + this.loading$) ;  
      });
  }

  getUsers() {


    this.usersService.getUserList()
      .subscribe(u => {
        this.users= u ;
        console.log("this users", this.users);
        console.log("loading flag =" + this.loading$) ;
        this.lastRetrieveTime = new Date() ;
      }, (error) =>  this.httpUtilityService.errorHandler("Retrieve User List Failed", error), ()=>{
       console.log("loading flag finish=" + this.loading$) ;  
      });
  }

  viewUser(index : number){
    this.usersService.setSelectedUser(this.users[index]);
    this.router.navigateByUrl('/admin/user');
  }
  


}
