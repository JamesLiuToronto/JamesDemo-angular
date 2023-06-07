import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpUtilityService } from 'src/app/shared/service/http-utility.service';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../model/User';
import { UsersService } from '../services/users.service';
import { PageService } from 'src/app/shared/service/page.service';
import { Pager } from 'src/app/shared/dto/Pager';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  lastRetrieveTime: Date | undefined;
  loading$ = this.loader.loading$;
  title: string = "Retrieve User List";

  pageResult: Pager | undefined;

  sortField: string = 'emailAddress';
  sortOrder = 1;
  paginaition = true;

  pageSizes = [2, 5, 10, 20, 50];
  pageNumber = 0 ;
  pageSize = this.pageSizes[0] ;
 


  constructor(public loader: LoadingService, private usersService: UsersService,
    private router: Router, private httpUtilityService: HttpUtilityService,
    private authService: AuthService, private _Activatedroute: ActivatedRoute,
    private pageService: PageService) {
      
  }
  ngOnInit(): void {

    this.pageService.pageChangeEvent
      .subscribe(
        (page: number) => {
          this.pageNumber = page ;
          this.getUserList();
          return ;
        }
      );

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
          console.log("pageSize =" + this.pageSize);
          console.log("pageNumber =" + this.pageNumber);
          this.lastRetrieveTime = new Date();
          this.pageService.dataChangeEvent.emit(true);
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
    this.users = this.pageService.setPage(u) ;

  }


  
  viewUser(index: number) {
    this.usersService.setSelectedUser(this.users[index]);
    this.router.navigateByUrl('/admin/user');
  }

  processPageResult(u: any) {
    this.pageResult = u;

  }

  onChangePageSize(event: any) {

    this.pageSize = event.target.value ;
    this.pageNumber = 0 ;
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

