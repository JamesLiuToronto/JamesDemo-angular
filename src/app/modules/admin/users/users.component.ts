import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/shared/service/loading.service';
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

  constructor(public loader: LoadingService, private usersService: UsersService, private router: Router,) { 
  }
  ngOnInit(): void {

    if (this.users.length == 0){
     this.getUserList() ; 
      console.log("INIT retrirvr") ;
    }

        
  }
    
  getUserList() {


    this.usersService.getUserList()
      .subscribe(u => {
        this.users= u ;
        console.log("this users", this.users);
        console.log("loading flag =" + this.loading$) ;
        this.lastRetrieveTime = new Date() ;
      }, (error) => this.usersErrorHandler(error), ()=>{
       console.log("loading flag finish=" + this.loading$) ;  
      });
      
     
  }

  private usersErrorHandler(error: any) {
    alert("user Retrieve failed" + error.message);
    console.log("catch error =" + error.errorMessage);

  }

  viewUser(index : number){
    this.usersService.setSelectedUser(this.users[index]);
    this.router.navigateByUrl('/admin/user');
  }
  
  
  

}
