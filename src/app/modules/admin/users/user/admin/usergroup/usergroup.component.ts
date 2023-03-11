import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/admin/model/User';
import { UserService } from 'src/app/modules/admin/services/user.service';
import { UsersService } from 'src/app/modules/admin/services/users.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { HttpUtilityService } from 'src/app/shared/service/http-utility.service';

@Component({
  selector: 'app-usergroup',
  templateUrl: './usergroup.component.html',
  styleUrls: ['./usergroup.component.scss']
})
export class UsergroupComponent implements OnInit {

  constructor(private authService: AuthService, private usersService: UsersService, private userService: UserService, 
    private httpUtilityService: HttpUtilityService) { }

  user: User | undefined;
  adminLogin: boolean|undefined ;
  groupTypes:string[]|undefined ;
  selected :string[]|undefined ;

  ngOnInit(): void {
    this.user = this.usersService.getSelectedUser();
    this.adminLogin = this.authService.getLoginedInUserAccount().roleList.includes('ADMIN');
    if (this.adminLogin){
      this.groupTypes = ["ADMIN", "PARENT", "STUDENT", "TEACHER", "TA", "ASST"] ;
    } else {
      this.groupTypes = ["PARENT", "STUDENT"] ;
    }
    this.selected = this.user?.roleList.split(',');

  }
  

  save() {
    this.userService.updateUserGroup(this.user!, this.selected!.toString())
      .subscribe(u => {
        this.httpUtilityService.openPopWindow("INFO", " UserGroup Update Success", " ");
      }, (error) => {
        this.httpUtilityService.errorHandler(" UserGroup Update Failed ", error);
      });
  }

  undo() {
    this.selected = this.user?.roleList.split(',');
  }
 
  isLocalUserAccount(){
    return this.user?.provider =="NULL" ;
  }

}

