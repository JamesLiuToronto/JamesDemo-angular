import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class PopupWindowService {

    title: string | undefined;
    message: string | undefined;
    popType: string | undefined;
    showOpen: boolean = false;

    openPopWindow(type:string, title:string, message:string){
        this.message = message ;
        this.title = title;
        this.popType = type;
        this.showOpen = true ;
    }

    closePoPWindow(){
        this.showOpen = false ;
    }

    isOpen(){
        return this.showOpen ;
    }

    
  }