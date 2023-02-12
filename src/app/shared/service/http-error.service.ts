import { Injectable } from "@angular/core";
import { ErrorDTO } from "../models/ErrorDTO";


@Injectable({
    providedIn: 'root'
  })
  export class HttpErrorService {

    public loginErrorHandler(title:string, error: ErrorDTO) {

        alert(title + "-" + error.status + "-" + error.error + " detail=" + error.message);
        console.log(error.error + " " + error.message) ;
    }
    
  }