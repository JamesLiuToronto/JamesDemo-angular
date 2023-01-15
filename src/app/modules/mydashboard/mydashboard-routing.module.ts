import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPageComponent } from './components/pages/my-page/my-page.component';
import { MydashboardComponent } from './mydashboard.component';

const routes: Routes = [
  {
    path: '',
    component: MydashboardComponent,
    children: [
      { path: '', redirectTo: 'my-dash', pathMatch: 'full' },
      { path: 'my-dash', component: MyPageComponent },
      { path: '**', redirectTo: 'error/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MydashboardRoutingModule {}
