import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DownloadComponent } from './download/download.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'download', component: DownloadComponent, data: { returnUrl: window.location.pathname } },
      { path: 'roles', component: RolesComponent },
      { path: 'users', component: UsersComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
