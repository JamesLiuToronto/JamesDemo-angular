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
import { PopupWindowComponent } from 'src/app/shared/components/popup-window/popup-window.component';
import { EmailComponent } from './users/user/admin/email/email.component';
import { UserinfoComponent } from './users/user/admin/userinfo/userinfo.component';
import { UserstatusComponent } from './users/user/admin/userstatus/userstatus.component';
import { UsertokenComponent } from './users/user/admin/usertoken/usertoken.component';
import { UsergroupComponent } from './users/user/admin/usergroup/usergroup.component';
import { ReferenceComponent } from './reference/reference.component';




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

    ],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, AdminRoutingModule, AngularSvgIconModule.forRoot(),  PopupWindowComponent,]
})
export class AdminModule {}
