import { Component, OnInit} from '@angular/core';
import { User } from 'src/app/modules/admin/model/User';

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit  {

  users: User[] = [];
  constructor(private authService: AuthService) { 
  }
  ngOnInit(): void {

    console.log("users component init triggered") ;
    this.authService.userChangeEmitter.subscribe(()=>{
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

    this.authService.getUsersHttp()
      .subscribe(u => {
        this.users= u ;
        console.log("this users", this.users);
        
      }, (error) => this.usersErrorHandler(error), ()=>{
        this.authService.setNextUserId(this.users.length + 1) ;
        console.log("id get back=" + this.authService.getNextUserId()) ;
        console.log("retrieve completed")
      });
        
  }

  private usersErrorHandler(error: any) {
    alert("user Retrieve failed" + error.message);
    console.log("catch error =" + error.errorMessage);

  }
  
  

}
