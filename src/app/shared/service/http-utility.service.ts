import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ErrorDTO } from "../models/ErrorDTO";


@Injectable({
    providedIn: 'root'
  })
  export class HttpUtilityService {

    public loginErrorHandler(title:string, error: ErrorDTO) {

        alert(title + "-" + error.status + "-" + error.error);
        console.log(error.error + " " + error.message) ;
    }

    getHeader(): HttpHeaders{
      const auth_token = localStorage.getItem('token') ; 
      console.log("token=" + auth_token) ;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      });
      return headers;
    }
    
  }