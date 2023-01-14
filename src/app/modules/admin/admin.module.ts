import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AdminRoutingModule } from './admin-routing.module';
import { DownloadComponent } from './download/download.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AdminComponent,
    DownloadComponent,
    RolesComponent,
    UsersComponent,
    
  ],
  imports: [CommonModule, AdminRoutingModule, HttpClientModule, AngularSvgIconModule.forRoot()],
})
export class AdminModule {}
