import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AngularSvgIconModule } from "angular-svg-icon";
import { NgApexchartsModule } from "ng-apexcharts";
import { SharedModule } from "src/app/shared/shared.module";
import { BookComponent } from "./components/books/book/book.component";
import { BooksComponent } from "./components/books/books.component";
import { CartComponent } from "./components/cart/cart.component";
import { MyPageComponent } from "./components/pages/my-page/my-page.component";
import { MydashboardRoutingModule } from "./mydashboard-routing.module";
import { MydashboardComponent } from "./mydashboard.component";
import { DashheaderComponent } from './components/dashheader/dashheader.component';

@NgModule({
    declarations: [
      MydashboardComponent,
      MyPageComponent,
      BookComponent,
      BooksComponent,
      CartComponent,
      DashheaderComponent,
      
    ],
    imports: [
      CommonModule,
      MydashboardRoutingModule,
      SharedModule,
      HttpClientModule,
      NgApexchartsModule,
      AngularSvgIconModule.forRoot(),
    ],
  })
  export class MydashboardModule {}
  