import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from './loading.service';


@Injectable()
export class NetworkInterceptor implements HttpInterceptor {

  totalRequests = 0;
  requestsCompleted = 0;

  constructor(private loader: LoadingService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    this.loader.show();
    this.totalRequests++;
    console.log("network inceptor url=" + request.urlWithParams);
    console.log("network inceptor body=" + JSON.stringify(request.body));
    console.log("network inceptor header=" + request.headers);

    return next.handle(request).pipe(
      finalize(() => {

        this.requestsCompleted++;


        if (this.requestsCompleted === this.totalRequests) {
          this.loader.hide();
          this.totalRequests = 0; 
          this.requestsCompleted = 0;
        }
      })
    );
  }
}