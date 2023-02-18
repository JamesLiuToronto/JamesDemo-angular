import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ErrorDTO } from "../models/ErrorDTO";


@Injectable({
    providedIn: 'root'
  })
  export class HttpUtilityService {

    constructor(private router: Router){
      
    }

    public loginErrorHandler(title:string, error: ErrorDTO) {

        alert(title + "-" + error.status + "-" + error.error);
        if (error.status == 401){
          this.router.navigateByUrl('/auth/sing-in');
        }

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