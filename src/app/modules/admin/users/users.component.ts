import { Component, OnInit} from '@angular/core';
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

  constructor(public loader: LoadingService, private usersService: UsersService) { 
  }
  ngOnInit(): void {

    console.log("users component init triggered") ;
    this.usersService.userChangeEmitter.subscribe(()=>{
      this.getUserList() ; 
      return ;
    })

    if (this.users.length == 0){
     this.getUserList() ; 
      console.log("INIT retrirvr") ;
    }

        
  }
    
  getUserList() {


    this.usersService.getUsers()
      .subscribe(u => {
        this.users= u ;
        console.log("this users", this.users);
        console.log("loading flag =" + this.loading$) ;
        this.lastRetrieveTime = new Date() ;
      }, (error) => this.usersErrorHandler(error), ()=>{
        this.usersService.setNextUserId(this.users.length + 1) ;
        console.log("id get back=" + this.usersService.getNextUserId()) ;
        console.log("loading flag finish=" + this.loading$) ;  
      });
      
     
  }

  private usersErrorHandler(error: any) {
    alert("user Retrieve failed" + error.message);
    console.log("catch error =" + error.errorMessage);

  }
  
  
  

}
