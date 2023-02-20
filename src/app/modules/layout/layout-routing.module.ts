import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  
  {
    path: 'mydashboard',
    component: LayoutComponent,
    loadChildren: () => import('../mydashboard/mydashboard.module').then((m) => m.MydashboardModule),  canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: LayoutComponent,
    loadChildren: () => import('../admin/admin.module').then((m) => m.AdminModule),  canActivate: [AuthGuard]
  },
  { path: '', redirectTo: 'mydashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
