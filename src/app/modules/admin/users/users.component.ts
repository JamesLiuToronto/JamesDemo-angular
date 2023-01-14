import { Component, OnInit} from '@angular/core';
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
  constructor(private usersService: UsersService) { 
  }
  ngOnInit(): void {

    console.log("users component init triggered") ;
    this.usersService.userChangeEmitter.subscribe(()=>{
      this.getUserList() ; 
      console.log("CALL INIT finish") ;
      return ;
    })

    if (this.users.length == 0){
      this.getUserList() ; 
      console.log("INIT retrirvr") ;
    }

        
  }
  

  isLoading: boolean = false;
    
  getUserList() {

    this.usersService.getUsers()
      .subscribe(u => {
        this.users= u ;
        console.log("this users", this.users);
        this.lastRetrieveTime = new Date() ;
      }, (error) => this.usersErrorHandler(error), ()=>{
        this.usersService.setNextUserId(this.users.length + 1) ;
        console.log("id get back=" + this.usersService.getNextUserId()) ;
        console.log("retrieve completed")
      });

        
  }

  private usersErrorHandler(error: any) {
    alert("user Retrieve failed" + error.message);
    console.log("catch error =" + error.errorMessage);

  }
  
  

}
