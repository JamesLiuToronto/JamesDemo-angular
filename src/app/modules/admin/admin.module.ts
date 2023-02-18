import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AdminRoutingModule } from './admin-routing.module';
import { DownloadComponent } from './download/download.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
    declarations: [
        AdminComponent,
        DownloadComponent,
        RolesComponent,
        UsersComponent,
        UserComponent,
    ],
    imports: [CommonModule, FormsModule, AdminRoutingModule, AngularSvgIconModule.forRoot(), SharedModule]
})
export class AdminModule {}
