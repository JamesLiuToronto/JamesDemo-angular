import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnvServiceProvider } from './shared/service/env.service.provider';
import { NetworkInterceptor } from './shared/service/network.interceptor';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, HttpClientModule, ReactiveFormsModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true }, EnvServiceProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
