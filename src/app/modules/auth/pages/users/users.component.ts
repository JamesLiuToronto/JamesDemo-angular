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


    if (this.users.length == 0){
      this.getUserList() ; 
      console.log("INIT retrirvr") ;
    }
    
  }
  

  isLoading: boolean = false;
    
  getUserList() {

    
        
  }

  private usersErrorHandler(error: any) {
    alert("user Retrieve failed" + error.message);
    console.log("catch error =" + error.errorMessage);

  }
  
  

}
