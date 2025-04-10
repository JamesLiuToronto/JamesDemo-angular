import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AdminRoutingModule } from './admin-routing.module';
import { DownloadComponent } from './download/download.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailComponent } from './users/user/admin/email/email.component';
import { UserinfoComponent } from './users/user/admin/userinfo/userinfo.component';
import { UserstatusComponent } from './users/user/admin/userstatus/userstatus.component';
import { UsertokenComponent } from './users/user/admin/usertoken/usertoken.component';
import { UsergroupComponent } from './users/user/admin/usergroup/usergroup.component';
import { ReferenceComponent } from './reference/reference.component';
import { ReferenceTypeComponent } from './reference/reference-type/reference-type.component';
import { PopupWindowComponent } from 'src/app/shared/components/popup-window/popup-window.component';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { PageSizeComponent } from "../../shared/components/page-size/page-size.component";
import { PageFilterComponent } from "../../shared/components/page-filter/page-filter.component";





@NgModule({
    declarations: [
        AdminComponent,
        DownloadComponent,
        RolesComponent,
        UsersComponent,
        UserComponent,
        EmailComponent,
        UserinfoComponent,
        UserstatusComponent,
        UsertokenComponent,
        UsergroupComponent,
        ReferenceComponent,
        ReferenceTypeComponent,
    ],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, AdminRoutingModule, AngularSvgIconModule.forRoot(), PopupWindowComponent, PaginationComponent, PageSizeComponent, PageFilterComponent]
})
export class AdminModule {}
