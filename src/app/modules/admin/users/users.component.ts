import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ErrorDTO } from 'src/app/shared/models/ErrorDTO';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { PopupWindowService } from 'src/app/shared/service/popup-window.service';
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
  

  constructor(public loader: LoadingService, private usersService: UsersService, private router: Router, private popWindowService: PopupWindowService) { 
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
      }, (error) =>  this.errorHandler("Retrieve User List Failed" , error), ()=>{
       console.log("loading flag finish=" + this.loading$) ;  
      });
      
     
  }

  viewUser(index : number){
    this.usersService.setSelectedUser(this.users[index]);
    this.router.navigateByUrl('/admin/user');
  }
  
  errorHandler(title: string, error: ErrorDTO) {

    this.popWindowService.openPopWindow("ERROR", title + " - Error - (" + error.status + ")", error.error) ;

  }

}
