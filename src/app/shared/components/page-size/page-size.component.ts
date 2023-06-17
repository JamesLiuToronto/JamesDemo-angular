import { Component } from '@angular/core';
import { PageService } from '../../service/page.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-size',
  standalone: true,
  templateUrl: './page-size.component.html',
  styleUrls: ['./page-size.component.scss'],
  imports: [CommonModule]
})
export class PageSizeComponent {

  constructor(private pageService: PageService){}
  pageSizes = [2, 5, 10, 20, 50];


  public onChangePageSize(event: any) {

    this.pageService.pageSizeChangeEvent.emit(event.target.value);
    //this.pageNumber = 0;
    //this.getUsers();
  }

}
