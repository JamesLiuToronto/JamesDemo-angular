import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpUtilityService } from 'src/app/shared/service/http-utility.service';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { AuthService } from '../../auth/services/auth.service';
import { User, UserFilterType } from '../model/User';
import { UsersService } from '../services/users.service';
import { PageService } from 'src/app/shared/service/page.service';
import { PageFilter, Pager } from 'src/app/shared/dto/Pager';
import { Subscription } from 'rxjs';
import { UsersFilterService } from '../services/usersFilter.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  users: User[] = [];
  lastRetrieveTime: Date | undefined;
  loading$ = this.loader.loading$;
  title: string = "Retrieve User List";

  selectedFilter: PageFilter|undefined ;

  pageResult: Pager | undefined;

  sortField: string = 'emailAddress';
  sortOrder = 1;
  paginaition = true;

  pageSizes = [2, 5, 10, 20, 50];
  pageNumber = 0;
  pageSize = this.pageSizes[0];

  singleSubscription: Subscription | undefined;
  pageSubscription: Subscription | undefined;
  filters: PageFilter[]|undefined ;



  constructor(public loader: LoadingService, private usersService: UsersService,
    private router: Router, private httpUtilityService: HttpUtilityService,
    private authService: AuthService, private _Activatedroute: ActivatedRoute,
    private pageService: PageService, private usersFilterService:UsersFilterService) {
    this.selectedFilter = this.pageService.getInitPageFilter();
    this.filters = this.usersFilterService.getUserFilters() ;

  }
  ngOnDestroy(): void {
    if (!(this.singleSubscription == undefined)) {
      this.singleSubscription?.unsubscribe();
    }
    if (!(this.pageSubscription == undefined)) {
      this.pageSubscription?.unsubscribe();
    }
  }
  ngOnInit(): void {

    this.pageService.pageChangeEvent
      .subscribe(
        (page: number) => {
          this.pageNumber = page;
          this.getUserList();
          return;
        }
      );

    this.pageService.pageSizeChangeEvent
      .subscribe(
        (size: number) => {
          this.pageSize = size;
          this.resetPage();
          return;
        }
      );  

      this.pageService.filterChangeEvent
      .subscribe(
        (filter: PageFilter) => {

          console.log("search Type inusers=" + filter.fieldName) ;
          console.log("search value inusers=" + filter.fieldValue) ;
          console.log("search from inusers=" + filter.fromValue) ;
          console.log("search to inusers=" + filter.toValue) ;
          this.selectedFilter = filter ;
          this.resetPage();
          return;
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

  resetPage(){
    this.pageNumber = 0;
    this.getUsers();
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
      return;
    }

    this.getUserById(this.authService.getLoginedInUserAccount().userId);
  }

  getUserById(userAccountId: number) {
    this.singleSubscription = this.usersService.getUserById(userAccountId)
      .subscribe({
        next: u => {
          this.users = [u];
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
    console.log("filter when retrieve" + this.selectedFilter?.displayName) ;
    this.pageSubscription = this.usersService.getUserListWithPagenition(this.sortField, this.sortOrder, this.pageNumber, this.pageSize, this.selectedFilter!)
      .subscribe({
        next: u => {
          this.setPage(u);
          console.log("this users", this.users);
          
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

  setPage(u: any) {
    this.users = [];
    this.users = this.pageService.setPage(u);
    console.log("setpage=" + JSON.stringify(this.users));

  }



  viewUser(index: number) {
    this.usersService.setSelectedUser(this.users[index]);
    this.router.navigateByUrl('/admin/user');
  }

  processPageResult(u: any) {
    this.pageResult = u;

  }

  
  onChangePage(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.getUsers();
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

  isUserFilterUndifined(){
    return !this.selectedFilter?.active ;
  }

  
}

