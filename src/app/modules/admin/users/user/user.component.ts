import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],

})
export class UserComponent {

  constructor(private location: Location) { }
  
  goBack() {
    this.location.back();
  }
 


}
