import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpUtilityService } from 'src/app/shared/service/http-utility.service';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../model/User';
import { UsersService } from '../services/users.service';
import { Pager } from './pagnition/pagnition.component';
import { PageService } from 'src/app/shared/service/page.service';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  userContent:string | undefined ;
  lastRetrieveTime: Date | undefined;
  loading$ = this.loader.loading$;
  title: string = "Retrieve User List";

  pageResult: Pager | undefined;

  sortField: string = 'emailAddress';
  sortOrder = 1;
  pagenaition = true;

  intiPageNumber = 0 ;
  initPageSize = 5 ;

  pageNumber = this.intiPageNumber ;
  pageSize = this.initPageSize ;

  constructor(public loader: LoadingService, private usersService: UsersService,
    private router: Router, private httpUtilityService: HttpUtilityService,
    private authService: AuthService, private _Activatedroute: ActivatedRoute,
    private pageService: PageService) {
      
  }
  ngOnInit(): void {

    if (this.users.length == 0) {
      this.getUserList();
      console.log("INIT retrirvr");
    }

    this._Activatedroute.data.subscribe(params => {
      console.log(params);
      let type = params['type'];

    })


  }

  isAdmin() {
    let account = this.authService.getLoginedInUserAccount();
    if (account.roleList.includes("ADMIN")) {
      return true;
    } else {
      return false;
    }
  }

  getUserList() {
    if (this.isAdmin()) {
      this.getUsers();
    }

    this.getUserById(this.authService.getLoginedInUserAccount().userId);
  }

  getUserById(userAccountId: number) {
    this.usersService.getUserById(userAccountId)
      .subscribe({
        next: u => {
          this.users.push(u);
          this.lastRetrieveTime = new Date();
        },
        error: (error) => {
          this.httpUtilityService.errorHandler("Retrieve User Failed by Id-" + userAccountId, error)
        },
        complete: () => {
          console.log("loading flag finish=" + this.loading$);
        }
      });
  }

  private getUsers() {
    this.usersService.getUserListWithPagenition(this.sortField, this.sortOrder, this.pageNumber, this.pageSize)
      .subscribe({
        next: u => {
          this.setPage(u) ;
          console.log("this users", this.users);
          console.log("loading flag =" + this.loading$);
          this.lastRetrieveTime = new Date();
        },
        error: (error) => {
          this.httpUtilityService.errorHandler("Retrieve User List Failed", error);
        },
        complete: () => {
          console.log("loading flag finish=" + this.loading$);
        }
      });
  }

  setPage(u:any){
    this.userContent = this.pageService.setPage(u) ;
    this.users = JSON.parse(this.userContent) ;
  }
  
  viewUser(index: number) {
    this.usersService.setSelectedUser(this.users[index]);
    this.router.navigateByUrl('/admin/user');
  }

  processPageResult(u: any) {
    this.pageResult = u;

  }

  onChangePageSize(size: number) {
    this.pageSize = size ;
    this.pageNumber = this.intiPageNumber ;
    this.getUsers() ;
  }

  onChangePage(pageNumber: number) {
    this.pageNumber = pageNumber ;
    this.getUsers() ;
  }


  sortBy(field: string) {
    if (this.users.length <= 1) return;
    this.sortOrder = field === this.sortField ? (this.sortOrder * -1) : 1;
    this.sortField = field;
    this.getUsers();
  }

  sortIcon(field: string) {
    if (this.users.length <= 1) return;
    if (field === this.sortField) {
      return this.sortOrder === -1 ? '☝️' : '👇';
    }
    return '';
  }



}

