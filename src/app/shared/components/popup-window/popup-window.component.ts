import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PopupWindowService } from '../../service/popup-window.service';

@Component({
  selector: 'app-popup-window',
  standalone: true,
  templateUrl: './popup-window.component.html',
  styleUrls: ['./popup-window.component.css'],
  imports: [CommonModule],

})
export class PopupWindowComponent {

  constructor (private popWindowService: PopupWindowService){

  }

  title(){
   return this.popWindowService.title ;
 }
 
 message(){
  return this.popWindowService.message ;
 }

 popType(){
  return this.popWindowService.popType ;
 }
  showOpen(){
    return this.popWindowService.showOpen ;
  }

  close() {
    this.popWindowService.closePoPWindow();
  }

  errorPop(){
    return this.popWindowService.popType == "ERROR" ;
  }

  infoPop(){
    return this.popWindowService.popType == "INFO" ;
  }


}
