import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpUtilityService } from 'src/app/shared/service/http-utility.service';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../model/User';
import { UsersService } from '../services/users.service';



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
  isFamilyPage: boolean = false;
  readonly familyPage = "family";

  sortField: string = 'NA';
  sortOrder = 1;
  pagenaition = false;

  pager?: Pager;
  @Output() changePage = new EventEmitter<any>(true);
  @Input() initialPage = 1;
  @Input() pageSize = 5;
  @Input() maxPages = 10;


  constructor(public loader: LoadingService, private usersService: UsersService,
    private router: Router, private httpUtilityService: HttpUtilityService,
    private authService: AuthService, private _Activatedroute: ActivatedRoute) {
  }
  ngOnInit(): void {

    if (this.users.length == 0) {
      this.getUserList();
      console.log("INIT retrirvr");
    }

    this._Activatedroute.data.subscribe(params => {
      console.log(params);
      let type = params['type'];
      if (type == this.familyPage) {
        this.isFamilyPage = true
      }
    })


  }

  getUserList() {
    let account = this.authService.getLoginedInUserAccount();
    if (account.roleList.includes("ADMIN")) {
      this.getUsers();
    } else {
      this.getUserById(account.userId);
    }


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

  getUsers() {
    if (this.sortField == "NA"){
      this.getAllUsers();
    } else {
      this.getAllUsersWithSort() ;
    }
  }

  private getAllUsers() {
    this.usersService.getUserList()
      .subscribe({
        next: u => {
          this.users = u;
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

  private getAllUsersWithSort() {
    this.usersService.getUserListWithSortOnly(this.sortField, this.sortOrder)
      .subscribe({
        next: u => {
          this.users = u;
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


  viewUser(index: number) {
    this.usersService.setSelectedUser(this.users[index]);
    this.router.navigateByUrl('/admin/user');
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

export interface Pager {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  startIndex: number;
  endIndex: number;
  pages: number[];
}
