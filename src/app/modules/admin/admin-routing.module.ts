import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DownloadComponent } from './download/download.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';
import { ReferenceComponent } from './reference/reference.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'download', component: DownloadComponent, data: { returnUrl: window.location.pathname } },
      { path: 'family', component: UsersComponent, data: { type: 'family' }} ,
      { path: 'reference', component: ReferenceComponent },
      { path: 'users', component: UsersComponent, data: { type: 'users' }},
      { path: 'user', component: UserComponent,},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
